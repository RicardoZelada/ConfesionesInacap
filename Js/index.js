tinymce.init({
    selector: '#descripcion-tarea',
    height: 180,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

window.listarErrores = (errorList)=>{//metodo para mostrar los errores
    let error =document.querySelector("#errores-div");
    let ol =document.createElement('ol');
    ol.classList.add("alert","alert-danger");
    errorList.forEach((items)=> {
    let li = document.createElement("li")
    li.classList.add("list-group-item");
    li.innerText = items;
    ol.appendChild(li)
    });
    error.appendChild(ol);
}

window.mostrarImagen = ()=>{
    let imagen = '';
    window.confesion.forEach((link)=>{
        if(link.seleccion === "Desarrollo Web & Mobile"){
            imagen = '3starts.png';
        }if(link.seleccion === "Analista Programador"){
            imagen = '2starts.png';
        }else{
            imagen = '1start.png';
        }
    })
}


window.adjuntarConfesion = ()=>{//creo una funcion para cargar la confesion y a la vez creo la lista o tabla
    let tableBody = document.querySelector("#confesiones-tabla");
    tableBody.innerHTML = "";//limpio tabla
    let incremento = 1;
    let imagen = '';
    window.confesion.forEach((elemento)=>{//recorro la lista de confesiones
        let trtable = document.createElement("tr");
        trtable.innerHTML = "";
        let tdFolio = document.createElement("td");
        tdFolio.innerText = incremento;
        tdFolio.classList.add('align-middle')
        //creo Td para el nombre
        let tdName = document.createElement("td");
        tdName.classList.add('align-middle');
        tdName.innerText = elemento.nombre;
        //creo Td para la descripcion
        let tdDescripcion = document.createElement("td");
        tdDescripcion.classList.add('mt-5');
        tdDescripcion.innerHTML = elemento.descripcion;
        //creo Td para la carrera 
        let tdCarrer = document.createElement("td");
        tdCarrer.classList.add('align-middle');
        if(elemento.seleccion === "Desarrollo Web & Mobile"){
            tdName.classList.add("text-danger");
        }
        tdCarrer.innerText = elemento.seleccion;
        //creo Td para la valoracion
        let tdValoracion = document.createElement("td");
        if(elemento.seleccion === "Desarrollo Web & Mobile"){
            tdValoracion.style = "width:64px";
            imagen = '3starts.png';
            tdValoracion.classList.add('align-middle');
        }else if(elemento.seleccion === "Analista Programador"){
            tdValoracion.style = "width:64px";
            imagen = '2starts.png';
            tdValoracion.classList.add('align-middle');
        }else{
            tdValoracion.style = "width:64px";
            imagen = '1start.png';
            tdValoracion.classList.add('align-middle');
        }
        let img = document.createElement("img");
        img.src = "img/"+imagen;
        img.classList.add("img-fluid");
        tdValoracion.appendChild(img);//la agrego al td
        
        //creo un Td para el boton eliminar
        let tdAction = document.createElement("td");
        let btnAcction = document.createElement("button");
        btnAcction.innerText = "Eliminar";
        btnAcction.classList.add("btn", "btn-danger");
        btnAcction.incremento = incremento;

        btnAcction.incremento = incremento;
        btnAcction.addEventListener('click', ()=>{
            window.eliminarConfesion(btnAcction.incremento);
        });
        tdAction.appendChild(btnAcction);
        trtable.appendChild(tdFolio);
        trtable.appendChild(tdName);
        trtable.appendChild(tdDescripcion);
        trtable.appendChild(tdCarrer);
        trtable.appendChild(tdValoracion);//
        trtable.appendChild(tdAction);
        tableBody.appendChild(trtable);
        incremento += 1;
    })

};


window.eliminarConfesion = (incremento)=>{
    Swal.fire({
        title: 'Quieres Eliminar el Registro?',
        text: "No podras recuperarlo!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Deseo Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {//Promesa
            window.confesion.splice(incremento-1,1);//splice borra una lista  
            window.adjuntarConfesion();//incremento -1,1 bora la posicion, el indice 
          Swal.fire(
            'Eliminado!',
            'Tu registro ha sido borrado.',
            'success'
          )
        }
      })
}

window.confesion = [];//creo una lista para guardar las confesiones

window.guardarConfesion = (confesion)=>{//creo una funcion para guardar la confesion
window.confesion.push(confesion);
window.adjuntarConfesion();
};



const btnAux = document.querySelector("#btn-enviar");//creo variable para llamar al boton

btnAux.addEventListener('click', ()=>{//btnAux le doy un evento para q hago lo siguiente
    let errorDivs = document.querySelector("#errores-div");//se crea una variable donde llamare al contenedor div del html
    errorDivs.innerHTML = "";//limpio el contenedor

    let name = document.querySelector("#nombre-txt").value.trim();
    let description = tinymce.get("descripcion-tarea").getContent();
    let option = document.querySelector("#tipo-select").value;

    errorList = [];//creo una lista de errores 
    if(name === ""){
        errorList.push("Ingrese un nombre");
    }if(description === ""){
        errorList.push("Ingrese una descripcion");
    }if(option ==="#"){
        errorList.push("Escoja una opcion valida");
    }
    if(errorList.length === 0){
        let confesion = {}//creo un objeto confesion
        confesion.nombre = name;//name variable del valor que obtengo del html nombre-txt
        confesion.descripcion = description;//description variable del valor que obtengo del html descripcion-tarea
        confesion.seleccion = option;//option varable del valor que obtengo del html tipo-select

        window.guardarConfesion(confesion);
    }else{
        window.listarErrores(errorList);
    }
})
