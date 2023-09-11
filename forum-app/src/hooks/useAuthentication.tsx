import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import Cookies from 'universal-cookie';

export function GetAuthentication() : string | undefined {
    const cookies = new Cookies();
    return cookies.get('forum-a-c-cookie-lib');
}

export function SetAuthentication(value : string) {
    const cookies = new Cookies();
    cookies.set('forum-a-c-cookie-lib', value);
}

export function ClearAuthentication() {
    const cookies = new Cookies();
    cookies.remove('forum-a-c-cookie-lib');
}

export function GetCurrentUser() : string | undefined {
    const jwt = GetAuthentication();
    if (!jwt) return undefined;

    let decodedJwt = jwtDecode<Token>(jwt);
    return decodedJwt.user;
}

interface Token {
    user: string
}