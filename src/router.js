document.addEventListener('DOMContentLoaded', () => {
    const myComponent = document.querySelector('table-component');

    // Función para cargar datos basados en la ruta
    async function loadData(path) {
        try {
            const response = await fetch(`/pages${path}-data.json`);
            const data = await response.json();
            myComponent.setData(data); // Pasar los datos al componente
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // Manejar clics en enlaces
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            history.pushState(null, null, href);
            loadData(href);
        }
    });

    // Manejar navegación hacia atrás/adelante
    window.addEventListener('popstate', () => {
        loadData(window.location.pathname);
    });

    // Cargar datos iniciales
    loadData(window.location.pathname);
});