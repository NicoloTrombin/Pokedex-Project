import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable ({providedIn: 'root'})
export class AuthService {
    
    constructor(private router: Router) {}

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token')
    }

    signOut() {
        localStorage.clear();
        this.router.navigateByUrl('/');
    }

    storeToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue);
    }

    getToken() {
        return localStorage.getItem('token');
    }
}