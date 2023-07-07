document.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://deissMS.github.io/pmo_s/consolidado.json')
    .then(response => response.json())
    .then(data => {
        let categories = [...new Set(data.map(item => item.categoria))];
        let selectElement = document.getElementById('categoria');
        categories.forEach(category => {
            let optionElement = document.createElement('option');
            optionElement.value = category;
            optionElement.textContent = category;
            selectElement.appendChild(optionElement);
        });

        document.getElementById('busqueda').addEventListener('input', function(e) {
            document.getElementById('categoria').value = '';
        });

        document.getElementById('categoria').addEventListener('change', function(e) {
            document.getElementById('busqueda').value = '';
        });

        document.getElementById('buscador').addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('texto-seccion').innerHTML = ''; // limpia los resultados anteriores
            var valorBuscado = document.getElementById('busqueda').value;
            var valorCategoria = document.getElementById('categoria').value;

            var resultado = data.filter(function(obj) {
                if (valorBuscado !== "") {
                    return obj.nombre.toLowerCase().includes(valorBuscado.toLowerCase()) || obj.categoria.toLowerCase().includes(valorBuscado.toLowerCase());
                } else {
                    return obj.categoria === valorCategoria;
                }
            });

            if (resultado.length > 0) {
                document.getElementById('texto-seccion').style.display = 'block';
                var coberturas = resultado.map(function(obj) {
                    var coberturaText;
                    if (isNumeric(obj.cobertura)) {
                      coberturaText = (obj.cobertura * 100) + '%';
                    } else {
                      coberturaText = obj.cobertura;
                    }
                    return '<p class="nombre-resultado">'+ obj.nombre +'</p>' +
                           '<p class="resultado">CategorÍa: ' + obj.categoria + '</p>' +
                           '<p class="resultado">SubcategorÍa: ' + obj.subcategoria + '</p>' +
                           '<p class="resultado">Normativa que la incluye: ' + obj.norma + '</p>' +
                           '<p class="resultado"><b>Nivel de cobertura: ' + coberturaText + '</b></p>' +
                           '<p class="resultado">Recomendaciones de uso: ' + obj.recomendaciones + '</p>';
                });
                document.getElementById('texto-seccion').innerHTML = `<h2 class="titulo-resultado">Resultado de la búsqueda: ${resultado.length} resultado/s encontrado/s</h2>` + coberturas.join('<hr>');
            } else {
                alert('No se encontró el valor buscado');
            }
        });
    })
    .catch(error => console.error('Error:', error));
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
