import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Generate Password';

  constructor(private http: HttpClient) {}

  password: string = '';
  length: number = 0;
  copied: boolean = false;
  copyLabel: string = 'Copia';
  loading: boolean = false;

  includeLetters: boolean = true;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;

  generatePassword(): void {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~';

    let chars: string = '';

    if (this.includeNumbers) {
      chars += numbers;
    }
    if (this.includeLetters) {
      chars += letters;
    }
    if (this.includeSymbols) {
      chars += symbols;
    }

    if (!chars.length) {
      this.password = 'Scegli il tipo di simboli';
      return;
    }

    this.password = Array.from(
      { length: this.length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  }

  generatePasswordAPI(): void {
    const url: string = `http://localhost:3000/api/password?length=${
      this.length
    }&special=${this.includeSymbols ? 'on' : 'off'}&numbers=${
      this.includeNumbers ? 'on' : 'off'
    }&upper=on&lower=on`;

    this.loading = true;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.password = data[0]?.password || 'xyz';
        this.loading = false;
      },
      error: (err) => {
        this.password = '';
        this.loading = false;
        alert(
          'Errore durante la creazione della password. API error: ' +
            err.message
        );
      },
    });
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.password).then(() => {
      this.copyLabel = 'Copiato!';
      setTimeout(() => (this.copyLabel = 'Copia'), 2000);
    });
  }

  decreaseLenght(): void {
    if (this.length > 4) {
      this.length--;
    }
  }

  increaseLenght(): void {
    if (this.length < 50) {
      this.length++;
    }
  }
}
