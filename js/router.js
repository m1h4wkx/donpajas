document.addEventListener("DOMContentLoaded", function () {
    // Buscar parámetro ?p= en la URL
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("p");

    // Si no hay ?p=, no hacemos nada (deja que Hugo cargue su index normal)
    if (!postId) return;

    // Cargar el JSON de posts
    fetch("/donpajas/posts/index.json")
        .then(res => res.json())
        .then(posts => {
            const post = posts.find(p => p.id == postId);
            if (post) {
                // Redirigir al post correcto
                window.location.href = post.url;
            } else {
                document.body.innerHTML = `
                    <h1 style="text-align:center;color:#fff;">❌ Post no encontrado</h1>
                    <p style="text-align:center;">El ID ${postId} no existe.</p>
                `;
            }
        })
        .catch(err => {
            console.error("Error cargando posts:", err);
            document.body.innerHTML = "<h1>⚠️ Error al cargar contenido</h1>";
        });
});
