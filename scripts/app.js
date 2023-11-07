Vue.component('menu-card', {
    props: ['menus'],
    data: function () {
        return {
            titulo: "Vida Saludable",
        }
    },
    template: `
        <div>
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="img/banner1.jpg" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="img/banner2.jpg" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="img/banner3.jpg" alt="Third slide">
                    </div>
                </div>
            </div>

            <h1>{{ titulo | uppercase }}</h1>

            <div class="row">
                <div v-for="menu in menus" class="col-md-4">
                    <div class="card mb-4">
                        <img :src="menu.image" class="card-img-top" :alt="menu.title">
                        <div class="card-body">
                            <h2 class="card-title">{{ menu.title | capitalize }}</h2>
                            <p class="card-text">{{ menu.texto }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});

Vue.component('form-data', {
    props: ['suscrito', 'planSeleccionado'],
    data: function () {
        return {
            form_data: {
                tema: localStorage.getItem('tema') || "",
                nombre: localStorage.getItem('nombre') || "",
                apellido: localStorage.getItem('apellido') || "",
                email: localStorage.getItem('email') || "",
                mensaje: localStorage.getItem('mensaje') || ""
            },
            mensaje: ""
        }
    },
    methods: {
        submitForm() {
            localStorage.setItem('nombre', this.form_data.nombre);
            localStorage.setItem('apellido', this.form_data.apellido);
            localStorage.setItem('email', this.form_data.email);
            localStorage.setItem('mensaje', this.form_data.mensaje);
            localStorage.setItem('tema', this.form_data.tema);

            if (!this.suscrito) {
                this.mensaje = `Te has suscrito al plan ${this.form_data.tema}.`;
            }
            this.$emit('suscribir', true);
        },
        desuscribirse() {
            this.form_data = {
                tema: "",
                nombre: "",
                apellido: "",
                email: "",
                mensaje: ""

            };
            localStorage.removeItem('nombre');
            localStorage.removeItem('apellido');
            localStorage.removeItem('email');
            localStorage.removeItem('mensaje');
            localStorage.removeItem('tema');

            this.mensaje = "Te has desuscrito del plan.";
            this.$emit('suscribir', false);
        }
    },
    template: `
        <div class="form">
            <h3>Suscribite</h3>
            <form @submit.prevent="submitForm">

                <label>Nombre</label>
                <input type="text" v-model="form_data.nombre" placeholder="Ingrese su Nombre"/>

                <label>Apellido</label>
                <input type="text" v-model="form_data.apellido" placeholder="Ingrese su apellido"/>

                <label>Email</label>
                <input type="email" v-model="form_data.email" placeholder="Ingrese su dirección de email"/>

                <label>Mensaje</label>
                <textarea name="mensaje" rows="3" v-model="form_data.mensaje" placeholder="Deje su comentario"/>


                <h3>Elige la opción deseada</h3>
                <label>Comenzar un estilo de vida saludable
                    <input type="radio" value="Comenzar un estilo de vida saludable" v-model="form_data.tema"/>
                </label>

                <label>Mosaicos semanales
                    <input type="radio" value="Mosaicos semanales para un mes + lista de compras + derribando mitos" v-model="form_data.tema"/>
                </label>

                <label>Plan alimentación
                    <input type="radio" value="Plan de alimentación personalizado" v-model="form_data.tema"/>
                </label>

                <label>Tratamiento Offline
                    <input type="radio" value="Tratamiento Offline" v-model="form_data.tema"/>
                </label>

                <label>Recetario
                    <input type="radio" value="Recetario" v-model="form_data.tema"/>
                </label>

                <label>Libro
                    <input type="radio" value="Libro" v-model="form_data.tema"/>
                </label>

                <button type="submit" class="btn btn-primary">{{ suscrito ? 'Guardar cambios' : 'Guardar' }}</button>
                <button @click="desuscribirse" class="btn btn-danger" v-if="suscrito">Desuscribirse</button>

            </form>
            <div v-if="mensaje" class="alert alert-success mt-3">
                {{ mensaje }}
            </div>
        </div>
    `
});

Vue.filter('capitalize', function (value) {
    if (!value) return '';
    value = value.toString().toLowerCase();
    return value.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
});

Vue.filter('uppercase', function (value) {
    if (!value) return '';
    return value.toUpperCase();
});

var app = new Vue({
    el: ".contenedor",
    data: {
        planSeleccionado: localStorage.getItem('tema') || null,
        menus: [
            {
                id: 1,
                title: 'comenzar un estilo de vida saludable',
                texto: "Plan de alimentación generalizado, ideal si querés comenzar un cambio de hábitos, tips básicos, consejos, lista de compras, entre otras cosas más que te ayudarán a comenzar este cambio, para luego ir en busca de tus objetivos, si así lo deseas, con un plan personalizado. No se realiza videollamada, ya que no es un plan personalizado.",
                image: 'img/id1.jpg',
                alt: "Tablet en mesa con plan inicial en pantalla",
            },
            {
                id: 2,
                title: 'mosaicos semanales para un mes + lista de compras + derribando mitos',
                texto: "Menú semanal por un mes, para poder variar tu alimentación siendo completa y equilibrada, fácil y práctica. Cuenta con todos los grupos de alimentos y algunos reemplazos para aquellas personas que no consuman carnes.",
                image: 'img/id2.png',
                alt: "Guias saludables",
            },
            {
                id: 3,
                title: 'plan de alimentación personalizado',
                texto: "Plan de alimentación personalizado. Se coordina una consulta por videollamada, nos conocemos y planteamos objetivos. Luego se recibe la planilla de control (con mediciones y peso) registro de 24 horas para completar todo lo que vas consumiendo. A la semana de la consulta se brinda el plan de alimentación acorde a tu requerimiento y objetivo, gustos y preferencias.",
                image: 'img/id3.png',
                alt: "Plato de comida voluminoso y nutritivo",
            },
            {
                id: 4,
                title: 'tratamiento offline',
                texto: "El tratamiento que ofrecemos es offline, a través de correo electrónico, donde el paciente y el nutricionista acordarán un día para comunicarse a través de correo electrónico y realizar los controles correspondientes, entrega del plan, planificación, evacuación de dudas o preguntas, etc. ",
                image: 'img/id4.jpg',
                alt: "Mujer desde su casa organizando su dia",
            },
            {
                id: 5,
                title: 'recetario otoño-invierno',
                texto: "Recetario con las de 22 recetas simples, ricas e ideales para otoño invierno. Cuenta con opciones para desayuno y merienda, almuerzos y cenas, postres.",
                image: 'img/id5.jpg',
                alt: "Diferentes recetas de comida",
            },
            {
                id: 6,
                title: 'Libro: Diseñados para una vida saludable',
                texto: "Diseñados Para una Vida Saludable es el primer libro físico de nutrición, con una mirada integral y cristiana. En las páginas de este libro te vas a encontrar con herramientas para cuidar tu espíritu, alma y cuerpo, desde una postura científica pero sobre todo de fe.",
                image: 'img/id6.jpg',
                alt: "Foto del libro",
            }
        ]
    },
    methods: {
        mostrarPlan(plan) {
            this.planSeleccionado = plan;
        }
    },
    computed: {
        isSuscrito() {
            return !!localStorage.getItem('tema');
        }
    },
    created() {
        if (localStorage.getItem('tema')) {
            this.mostrarPlan(localStorage.getItem('tema'));
        }
    }
});
