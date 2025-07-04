export function redirect(page) {
    let pathname = window.location.pathname
    if (pathname.includes(page))
        return;

    const goto = pathname.split('/').filter(path => {
        return path.endsWith('.html') ? path : delete path[path]
    }).map(path => path.split('.')[0] = page)[0]
    window.location.href = window.location.href.replace(window.location.href, '') + '/client/' + goto
}