import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Signos {
  nombre: string;
  apaterno: string;
  amaterno: string;
  dia: number;
  mes: number;
  year: number;
  sexo: string;
}

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export default class ZodiacoComponent implements OnInit {
  formGroup!: FormGroup;
  clientes: Signos = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    dia: 0,
    mes: 0,
    year: 0,
    sexo: '',
  };
  nombreCompleto!: string;
  signoZodiacal!: string;
  edad!: number;
  imagenSigno!: string;

  signosZodiacoChino = [
    'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente',
    'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
  ];

  signosZodiacoImagenes = [
    'https://i.ytimg.com/vi/Q_W9Zbol6WM/hqdefault.jpg',  // URL para Rata
    'https://th.bing.com/th/id/OIP.k3XvqMl1HJwQDAQqP6asBAHaGW?w=219&h=187&c=7&r=0&o=5&pid=1.7',  // URL para Buey
    'https://th.bing.com/th/id/OIP.241M2NiWvGyXmzYbuOynmAHaJ4?rs=1&pid=ImgDetMain', // URL para Tigre
    'https://th.bing.com/th/id/OIP.2pRv1IZG-WDFy_gUBt8_NQAAAA?w=300&h=394&rs=1&pid=ImgDetMain',// URL para Conejo
    'https://th.bing.com/th/id/R.0ad6c2ae7fff33c2a9bae0dd1d073553?rik=bwHR1BmGKVM1Ug&riu=http%3a%2f%2fimg1.wikia.nocookie.net%2f__cb20120203213105%2fshrek%2fimages%2f9%2f9b%2fDragon_Shrek_Forever_3.png&ehk=7mz5Acfj4NieUQlpVzUuzuyUNHGSxV1PcpDLwIxRfaM%3d&risl=&pid=ImgRaw&r=0',// URL para Dragón
    'https://png.pngtree.com/background/20230517/original/pngtree-picture-of-a-large-snake-with-red-and-black-stripes-picture-image_2640178.jpg',// URL para Serpiente
    'https://i.ytimg.com/vi/Ibcaejm1E3c/maxresdefault.jpg', // URL para Caballo
    'https://th.bing.com/th/id/OIP.U6wFQrfP_2Lf88vIS2vCZwHaFj?rs=1&pid=ImgDetMain',   // URL para Cabra
    'https://th.bing.com/th/id/OIP.B1bJPuR8eHMzU5_8vmZwpgHaHa?rs=1&pid=ImgDetMain',    // URL para Mono
    'https://ih1.redbubble.net/image.241860623.5434/flat,800x800,075,f.u1.jpg',   // URL para Gallo
    'https://th.bing.com/th/id/OIP.C78KsGI-J7HhO7ZSy1Iv4AHaHa?rs=1&pid=ImgDetMain',   // URL para Perro
    'https://th.bing.com/th/id/OIP.1QLOc_n-68-qRXgIRrIqHQAAAA?rs=1&pid=ImgDetMain'    // URL para Cerdo
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
    this.formGroup.valueChanges.subscribe(() => {
      this.actualizarInfoCliente();
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      year: [''],
      sexo: ['']
    });
  }

  actualizarInfoCliente(): void {
    const { nombre, apaterno, amaterno, dia, mes, year, sexo } = this.formGroup.value;
    
    this.clientes.nombre = nombre;
    this.clientes.apaterno = apaterno;
    this.clientes.amaterno = amaterno;
    this.clientes.dia = dia;
    this.clientes.mes = mes;
    this.clientes.year = year;
    this.clientes.sexo = sexo;


    localStorage.setItem('clienteInfo', JSON.stringify(this.clientes));
  }

  calcularSignoZodiacal(year: number): void {
    const index = (year - 4) % 12;
    this.signoZodiacal = this.signosZodiacoChino[index];
    this.imagenSigno = this.signosZodiacoImagenes[index]; 
  }

  calcularEdad(dia: number, mes: number, year: number): void {
    const actual = new Date();
    let edad = actual.getFullYear() - year;

    const cumple = new Date(actual.getFullYear(), mes - 1, dia);

    if (actual < cumple) {
      edad--;
    }

    this.edad = edad;
  }

  onSubmit(): void {
    this.nombreCompleto = `${this.clientes.nombre} ${this.clientes.apaterno} ${this.clientes.amaterno}`;
    this.calcularSignoZodiacal(this.clientes.year);
    this.calcularEdad(this.clientes.dia, this.clientes.mes, this.clientes.year);

    // Redireccionar
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/auth/zodiacal']);
  }
}
