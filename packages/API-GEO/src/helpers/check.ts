export function checkCamps(
    calle: string, 
    numero: number, 
    ciudad: string, 
    codigo_postal: string, 
    provincia: string, 
    pais: string
): Boolean {
    if(
        calle == null|| 
        numero== null|| 
        ciudad== null|| 
        codigo_postal== null|| 
        provincia== null|| 
        pais == null
        ) {return true}
        else {
            return false
        }
}