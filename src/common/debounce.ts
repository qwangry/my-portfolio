const debounce = <T extends (...args: unknown[]) => unknown>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export default debounce