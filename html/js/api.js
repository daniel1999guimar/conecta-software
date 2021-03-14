const token = 'EAADcNUunrzsBAGWL4f5uSiIis4PnnIbJO4EOECUaLpZC4sgwAcutaQ8W6qM4qdvWlH0tZBotGQdwPvu67T182GXDW3KjEDryehtZAiLvzuAhUYpt2AldIAc9qVFEcx23yZCPixZA7sC4LEfjURmjobgJ0awAHoZCg9kkMx6fAs5MDkuddK59NN';
var imagenUrl;
var perfilId = document.getElementById("perfil");
var logo = document.getElementById("logo");
var nombre = document.getElementById("nombre");
var likePersonas = document.getElementById("likePersonas");
var totalSegir = document.getElementById("totalSegir");
var totalHistorias = document.getElementById("totalHistorias");
var nombresTabla = document.getElementById("nombresTabla");
var totalfotos=[];
var nombreCarpetas=[];

window.fbAsyncInit = function () {
    FB.init({
        appId: '242121460657979',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
    });
    FB.api(
        'me/photos',
        'GET', {
        fields: 'images',
        access_token: token
    },
        function (response) {
            if (response.error) {
                console.error(response.error.message);
            }
            else {
                imagenUrl = response.data[0].images[5].source;
                perfilId.src = imagenUrl;
            }

        }
    );
    FB.api(
        'me',
        'GET', {
        fields: 'country_page_likes,new_like_count,name,fan_count,followers_count,talking_about_count',
        access_token: token
    },
        function (response) {
            if (response.error) {
                console.error(response.error.message);
            }
            else {
                nombre.innerHTML = response.name;
                likePersonas.innerHTML = response.fan_count;
                totalSegir.innerHTML = response.followers_count;
                totalHistorias.innerHTML = response.talking_about_count;

            }

        }

    );
    FB.api(
        'me/likes',
        'GET', {
        access_token: token
    },
        function (response) {
            if (response.error) {
                console.error(response.error.message);
            }
            else {
                var contador = 0;
                response.data.forEach(element => {
                    contador++;
                    var tr = nombresTabla.appendChild(createNode("tr", "", [], []));
                    tr.appendChild(createNode("td", contador, [], []))
                    tr.appendChild(createNode("td", element.name, ["txt-oflo"], []))
                });

            }

        }
    );

    FB.api(
        'me/albums',
        'GET', {
        fields: 'count,name',
        access_token: token
    },
        function (response) {
            if (response.error) {
                console.error(response.error.message);
            }
            else {
                response.data.forEach(element => {
                    totalfotos.push(parseInt(element.count));
                    nombreCarpetas.push(element.name);
                });
                /* console.log(nombreCarpetas) */
            }

        }
    );
};

function createNode(nodeName, nodeText, nodeClasses, nodeAttributes) {
    var node = document.createElement(nodeName);
    if (nodeText != "") {
        var textNode = document.createTextNode(nodeText);
        node.appendChild(textNode);
    }

    if (nodeClasses.length > 0) {
        nodeClasses.forEach(nodeClass => node.classList.add(nodeClass));
    }
    if (nodeAttributes.length > 0) {
        nodeAttributes.forEach(nodeAttribute => node.setAttribute(nodeAttribute.name, nodeAttribute.value))
    }
    return node;
}
export {totalfotos,nombreCarpetas}
