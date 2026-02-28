const productos = [
    // ===== DESTINATIONS =====
    {
        id: 'city-tour',
        tipo: 'destino',
        nombre: 'City Tour Cusco',
        duracion: '1 Day',
        ubicacion: 'Cusco city and immediate surroundings',
        precio: 25,
        imagen: 'https://i.ibb.co/HLQ5kh2k/city-tour.jpg',
        categorias: ['cultural', 'history'],
        descripcion: 'Discover the imperial city of Cusco, visiting its main squares, temples, and colonial buildings.',
        incluye: ['Professional guide', 'Tourist transport', 'Entrance to cathedrals']
    },
    {
        id: 'valle-sagrado',
        tipo: 'destino',
        nombre: 'Sacred Valley',
        duracion: '1 Day',
        ubicacion: '15-60 km northeast of Cusco',
        precio: 45,
        imagen: 'https://i.ibb.co/r2y3cng5/valle-sagrado.jpg',
        categorias: ['cultural', 'nature'],
        descripcion: 'Explore the heart of the Inca Empire through its traditional villages and archaeological sites.',
        incluye: ['Professional guide', 'Tourist transport', 'Buffet lunch']
    },
    {
        id: 'machu-picchu',
        tipo: 'destino',
        nombre: 'Machu Picchu',
        duracion: '1 Day',
        ubicacion: 'Urubamba Province',
        precio: 300,
        imagen: 'https://i.ibb.co/QF7VP5dV/machupicchu.jpg',
        categorias: ['cultural', 'history', 'iconic'],
        descripcion: 'Visit the wonder of the world, the lost city of the Incas, with a professional guide.',
        incluye: ['Train ticket', 'Bus ticket', 'Entrance ticket', 'Professional guide']
    },
    {
        id: 'humantay',
        tipo: 'destino',
        nombre: 'Humantay Lagoon',
        duracion: '1 Day',
        ubicacion: 'On the route to Salkantay',
        precio: 45,
        imagen: 'https://i.ibb.co/Zq7tJ5L/humantay.jpg',
        categorias: ['nature', 'adventure'],
        descripcion: 'Hike to the turquoise lagoon at the foot of the snow-capped Humantay mountain.',
        incluye: ['Professional guide', 'Transport', 'Breakfast box']
    },
    {
        id: 'vinicunca',
        tipo: 'destino',
        nombre: 'Vinicunca',
        duracion: '1 Day',
        ubicacion: 'Vilcanota Mountain Range',
        precio: 45,
        imagen: 'https://i.ibb.co/N66TJfT9/vinicuna-2.jpg',
        categorias: ['nature', 'adventure'],
        descripcion: 'Marvel at the mountain of seven colors, a geological wonder of the Andes.',
        incluye: ['Professional guide', 'Transport', 'Breakfast']
    },
    {
        id: 'palcoyo',
        tipo: 'destino',
        nombre: 'Palcoyo',
        duracion: '1 Day',
        ubicacion: 'Checacupe District',
        precio: 60,
        imagen: 'https://i.ibb.co/XZkwf4Hf/palcoyo.jpg',
        categorias: ['nature', 'adventure'],
        descripcion: 'Discover the alternative mountain of colors, less crowded and equally impressive.',
        incluye: ['Professional guide', 'Transport', 'Breakfast']
    },
    {
        id: 'inka-jungle',
        tipo: 'destino',
        nombre: 'Inka Jungle Trek',
        duracion: '4 Days',
        ubicacion: 'From Málaga pass to Machu Picchu',
        precio: 250,
        imagen: 'https://i.ibb.co/Gf4TXPC7/inka-jungle.jpg',
        categorias: ['adventure', 'trekking'],
        descripcion: 'An adventure that combines biking, hiking, and visiting Machu Picchu.',
        incluye: ['Professional guide', 'Transport', 'Accommodation', 'Meals']
    },
    {
        id: 'choquequirao',
        tipo: 'destino',
        nombre: 'Choquequirao Trek',
        duracion: '7 Days',
        ubicacion: 'Apurímac River Canyon',
        precio: 450,
        imagen: 'https://i.ibb.co/F4m2R0G5/choquequirao.jpg',
        categorias: ['adventure', 'trekking'],
        descripcion: 'Trek to the sacred sister of Machu Picchu, an archaeological site in the middle of the jungle.',
        incluye: ['Professional guide', 'Transport', 'Accommodation', 'Meals']
    },
    {
        id: 'ausangate',
        tipo: 'destino',
        nombre: 'Ausangate Trek',
        duracion: '7 Days',
        ubicacion: 'Highest peak in Cusco',
        precio: 760,
        imagen: 'https://i.ibb.co/prGGncw9/ausangate.jpg',
        categorias: ['adventure', 'trekking'],
        descripcion: 'A high mountain trek through rainbow mountains, glaciers, and hot springs.',
        incluye: ['Professional guide', 'Transport', 'Accommodation', 'Meals']
    },

    // ===== PACKAGES =====
    {
        id: 'paquete-aventura',
        tipo: 'paquete',
        nombre: 'Adventure and Nature',
        duracion: '5 Days / 4 Nights',
        ubicacion: 'Cusco, Jungle',
        precio: 450,
        imagen: 'https://i.ibb.co/qFPBshtz/paquetes-1.jpg',
        categorias: ['adventure', 'nature'],
        incluye: ['Machu Picchu', 'Humantay Lagoon', 'Vinicunca'],
        descripcion: 'The most adventurous package combining mountains, jungle, and Inca wonders.'
    },
    {
        id: 'paquete-cultural',
        tipo: 'paquete',
        nombre: 'Cultural Circuits',
        duracion: '4 Days / 3 Nights',
        ubicacion: 'Cusco',
        precio: 380,
        imagen: 'https://i.ibb.co/4RtpvNx4/paquetes-4.jpg',
        categorias: ['cultural'],
        incluye: ['City Tour', 'Sacred Valley', 'Machu Picchu'],
        descripcion: 'Immerse yourself in Inca history with our cultural package.'
    },
    {
        id: 'paquete-experiencias',
        tipo: 'paquete',
        nombre: 'Experiential Learning',
        duracion: '3 Days / 2 Nights',
        ubicacion: 'Andean Communities',
        precio: 320,
        imagen: 'https://i.ibb.co/sJsDQPFB/paquetes-3.jpg',
        categorias: ['experience'],
        incluye: ['Community lodging', 'Artisan workshops', 'Local meals'],
        descripcion: 'Live like a local and learn from Andean communities.'
    },
    {
        id: 'paquete-machu',
        tipo: 'paquete',
        nombre: 'Machupicchu Special',
        duracion: '2 Days / 1 Night',
        ubicacion: 'Cusco',
        precio: 280,
        imagen: 'https://i.ibb.co/bMRzhtW0/paquetes-2.jpg',
        categorias: ['cultural'],
        incluye: ['Machu Picchu', 'Cusco'],
        descripcion: 'The complete Machu Picchu experience in two days.'
    }
];
