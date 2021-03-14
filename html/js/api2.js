const token = 'EAADcNUunrzsBAGWL4f5uSiIis4PnnIbJO4EOECUaLpZC4sgwAcutaQ8W6qM4qdvWlH0tZBotGQdwPvu67T182GXDW3KjEDryehtZAiLvzuAhUYpt2AldIAc9qVFEcx23yZCPixZA7sC4LEfjURmjobgJ0awAHoZCg9kkMx6fAs5MDkuddK59NN';
var imagenUrl;
var imagen1 = document.getElementById("imagen1");
var perfilId = document.getElementById("perfil");
var logo = document.getElementById("logo");
var nombre = document.getElementById("nombre");
var correo = document.getElementById("correo");
var description = document.getElementById("description");
var direccion = document.getElementById("direccion");
var web = document.getElementById("web");

window.fbAsyncInit = function () {
    FB.init({
        appId: '242121460657979',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
    });
    FB.api(
        'me',
        'GET', {
        fields: 'name,phone,emails,description,category_list,has_whatsapp_number,website,contact_address,single_line_address',
        access_token: token
    },
        function (response) {
            if (response.error) {
                console.error(response.error.message);
            }
            else {
                nombre.innerHTML = response.name;
                correo.innerHTML = response.emails;
                description.innerHTML = response.description;
                direccion.innerHTML = response.single_line_address;
                web.innerHTML = response.website;
            }

        }
    );
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
                imagen1.src = imagenUrl
            }

        }
    );

}
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
