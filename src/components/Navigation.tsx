import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Book, Heart, Users, Video, Clock, BookOpen, Moon, Sun, Menu, X, AlertTriangle, ShieldCheck} from 'lucide-react';
import {useTheme} from '../context/ThemeContext';
import moment from 'moment-hijri'; // Importer moment-hijri

const navItems = [
    {to: '/hadiths', icon: Book, label: 'Hadiths'},
    {to: '/dhikrs', icon: Heart, label: 'Dhikrs'},
    {to: '/douaas', icon: Heart, label: 'Douaas'},
    {to: '/jurisprudence', icon: BookOpen, label: 'Jurisprudence'},
    {to: '/biographies', icon: Users, label: 'Biographies'},
    {to: '/multimedia', icon: Video, label: 'Multimedia'},
    {to: '/ecoles', icon: BookOpen, label: 'Madhaheb'},
    {to: '/Repliques', icon: ShieldCheck, label: 'Répliques'},
    {to: '/Mise-en-garde', icon: AlertTriangle, label: 'Mise en garde'},
    {to: '/prayer-times', icon: Clock, label: 'Prayer Times'},

];

export const Navigation: React.FC = () => {
    const {theme, toggleTheme} = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hijriDate, setHijriDate] = useState(''); // État pour stocker la date hijri

    // Fonction pour mettre à jour la date hijri
    useEffect(() => {
        const updateHijriDate = () => {
            const date = moment().format('iD iMMMM iYYYY'); // Format de la date hijri
            setHijriDate(date);
        };

        updateHijriDate(); // Mettre à jour la date au chargement
        const interval = setInterval(updateHijriDate, 86400000); // Mettre à jour la date chaque jour

        return () => clearInterval(interval); // Nettoyer l'intervalle
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center group">
              <span
                  className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-amiri group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                IslamicHub
              </span>
                        </Link>
                        {/* Afficher la date hijri */}
                        <span className="text-lg text-gray-600 dark:text-gray-300 font-amiri whitespace-nowrap">
  {hijriDate}
</span>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-2"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map(({to, icon: Icon, label}) => (
                            <Link
                                key={to}
                                to={to}
                                className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 mx-1"
                            >
                                <Icon className="w-4 h-4 mr-2"/>
                                <span className="font-amiri truncate max-w-[100px]">{label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-2"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        {navItems.map(({to, icon: Icon, label}) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 rounded-md mb-1"
                            >
                                <Icon className="w-5 h-5 mr-3"/>
                                <span className="font-amiri">{label}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};