describe('Prueba de la página de libros', function() {
  beforeEach(() => {
    // Supongamos que tu aplicación se ejecuta en localhost puerto 3000
    cy.visit('http://localhost:7000')
   
  })

  it('La página de libros se carga correctamente', function() {
    // entrea a la seccion de libros
    cy.get('a.chakra-link').contains('Libros').click();
    // Verifica que el título de la página sea correcto
    cy.get('h3').contains('Libros')
  })
  

  it('La página de Prestamos se carga correctamente', function() {
    // entrea a la seccion de libros
    cy.get('a.chakra-link').contains('Prestamos').click();
    // Verifica que el título de la página sea correcto
    cy.get('h3').contains('Préstamos')
  })
  
  it('La página de Usuarios se carga correctamente', function() {
    // entrea a la seccion de libros
    cy.get('a.chakra-link').contains('Usuarios').click();
    // Verifica que el título de la página sea correcto
    cy.get('h3').contains('Usuarios')
  })

  
  it('Se puede agregar un nuevo libro', function() {
    // entrea a la seccion de libros
    cy.get('a.chakra-link').contains('Libros').click();
    // Click en el botón para abrir el formulario de agregar
    cy.get('button[aria-label="add item"]').click()

    cy.get('input[id="field-:r6:"]').click().type('Nuevo Libro') 
    cy.get('input[id="field-:r7:"]').click().clear().type('5')
    cy.get('input[id="field-:r8:"]').click().clear().type('2023')
    cy.get('input[id="field-:r9:"]').click().clear().type('1')
    cy.get('input[id="field-:ra:"]').click().clear().type('2')
    cy.get('input[id="field-:rb:"]').click().clear().type('3')

    // Hace click en el botón de guardar
    cy.get('button').contains('Guardar').click()

    // Verifica que se haya agregado el nuevo libro a la tabla
    cy.get('td').contains('Nuevo Libro')

    // Elimina el libro agregado
    //cy.contains('td', 'Harry Potter') .parent('tr').contains('button').click()
      

    // Comprobar que Harry Potter ya no existe
    //cy.get('td').should('not.contain', 'Nuevo Libro')
    
  })

})