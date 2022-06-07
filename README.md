# TodoApp

## Como crear una nueva categoria _(temporal)_
Simplemente se necesita agregar una nueva sección en index.html de la siguiente forma:

```html
<section class="category" data-category="nombre-de-categoria">
    <h2 class="category__title">Nombre de categoria</h2>
</section>
```
>Observaciones:  
-La estructura es la misma para todas las categorías, solo es necesario cambiar "nombre-de-categoria" y "Nombre de categoria".  
-Si se borra una categoria, los todos permanecen en el localStorage.  

**Tareas pendientes:**  
* ~~Cambiar name -> category en archivo JSON~~
* Crear/borrar categorias usando interfaz