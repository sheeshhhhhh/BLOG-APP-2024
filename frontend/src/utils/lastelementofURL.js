

const lastelementofURL = (URL) => {
    const pathname = location.pathname

    const segments = pathname.split('/')
    const lastSegment = segments[segments.length - 1]
    return lastSegment
}

export default lastelementofURL
