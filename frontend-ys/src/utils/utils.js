export var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export function formatDate(date) {
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }
    return new Date(date).toLocaleDateString('es-ES', options)
}
