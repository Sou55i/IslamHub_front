# Guide de Publication Android - IslamHub

## Prérequis

- Android Studio installé
- JDK 17+
- Un compte Google Play Developer (25$ une fois)

## 1. Préparer le build

```bash
# Build de production
npm run build

# Synchroniser avec Capacitor
npx cap sync android
```

## 2. Ouvrir dans Android Studio

```bash
npx cap open android
```

## 3. Configurer l'application

### Modifier `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        applicationId "com.islamhub.app"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
}
```

### Ajouter les icônes

Placer les icônes dans:
- `android/app/src/main/res/mipmap-mdpi/` (48x48)
- `android/app/src/main/res/mipmap-hdpi/` (72x72)
- `android/app/src/main/res/mipmap-xhdpi/` (96x96)
- `android/app/src/main/res/mipmap-xxhdpi/` (144x144)
- `android/app/src/main/res/mipmap-xxxhdpi/` (192x192)

Utiliser [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/) pour générer les icônes.

## 4. Générer le keystore (une seule fois!)

```bash
keytool -genkey -v -keystore islamhub-release.keystore -alias islamhub -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANT**: Garder ce fichier et le mot de passe en sécurité. Si vous les perdez, vous ne pourrez plus mettre à jour l'app!

## 5. Configurer la signature

Créer `android/keystore.properties`:
```properties
storePassword=votre_mot_de_passe
keyPassword=votre_mot_de_passe
keyAlias=islamhub
storeFile=../islamhub-release.keystore
```

Modifier `android/app/build.gradle`:
```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

## 6. Build de release

Dans Android Studio:
1. **Build** > **Generate Signed Bundle / APK**
2. Choisir **Android App Bundle**
3. Sélectionner votre keystore
4. Choisir **release**
5. Build

Le fichier `.aab` sera dans `android/app/release/`.

## 7. Publication sur Google Play

### Créer la fiche de l'application

1. Aller sur [Google Play Console](https://play.google.com/console)
2. Créer une nouvelle application
3. Remplir les informations:
   - **Nom**: IslamHub
   - **Description courte**: Application islamique avec hadiths, coran et dhikrs
   - **Description complète**: (voir ci-dessous)
   - **Catégorie**: Livres et références > Religion et spiritualité
   - **Captures d'écran**: 2 minimum (téléphone), 1 pour tablette
   - **Icône**: 512x512 PNG

### Description suggérée

```
IslamHub - Votre compagnon islamique

Découvrez une collection authentique de:
- Hadiths du Prophète (ﷺ) avec traduction française
- Versets du Coran avec explications
- Dhikrs et invocations quotidiennes
- Citations des grands savants de l'Islam

Fonctionnalités:
✓ Textes en arabe avec phonétique
✓ Traductions en français
✓ Recherche avancée
✓ Mode sombre
✓ Horaires de prière
✓ Calendrier hégirien

Application 100% gratuite et sans publicité.
```

### Politique de confidentialité

Créer une page simple expliquant:
- Aucune donnée personnelle collectée
- Pas de tracking
- Contenu éducatif uniquement

## 8. Mises à jour

Pour chaque mise à jour:

1. Incrémenter `versionCode` et `versionName` dans `build.gradle`
2. Rebuild l'app
3. Uploader le nouveau `.aab` sur Play Console
4. Écrire les notes de version

## Checklist avant publication

- [ ] Icônes haute résolution
- [ ] Captures d'écran (min 2)
- [ ] Description complète
- [ ] Politique de confidentialité
- [ ] Keystore sauvegardé en sécurité
- [ ] Testé sur plusieurs appareils
- [ ] Mode sombre fonctionne
- [ ] Tous les liens fonctionnent
- [ ] Pas d'erreurs console

## Commandes utiles

```bash
# Build et sync
npm run build && npx cap sync android

# Ouvrir Android Studio
npx cap open android

# Lancer sur émulateur
npx cap run android

# Logs
npx cap run android --target=<device-id> --livereload
```

## Ressources

- [Capacitor Android](https://capacitorjs.com/docs/android)
- [Google Play Console](https://play.google.com/console)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)
