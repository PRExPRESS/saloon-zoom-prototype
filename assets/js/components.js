/**
 * Component Loader - Dynamically loads HTML components
 * Usage: Add data-component="component-name" to any element
 */

async function loadComponent(element, componentName) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        if (response.ok) {
            const html = await response.text();
            element.innerHTML = html;
        } else {
            console.error(`Failed to load component: ${componentName}`);
        }
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
    }
}

async function loadAllComponents() {
    const components = document.querySelectorAll('[data-component]');
    const loadPromises = Array.from(components).map(element => {
        const componentName = element.getAttribute('data-component');
        return loadComponent(element, componentName);
    });
    
    await Promise.all(loadPromises);
}

// Load components before initializing other scripts
document.addEventListener('DOMContentLoaded', async function() {
    await loadAllComponents();
    
    // Dispatch custom event after components are loaded
    const event = new CustomEvent('componentsLoaded');
    document.dispatchEvent(event);
});
