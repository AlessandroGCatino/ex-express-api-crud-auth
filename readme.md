Partendo dall'esercizio di ieri, aggiungiamo l'autenticazione al nostro progetto! Create tutto il necessario (Model, Controller, rotte e validazioni) per implementare le due funzionalità principali:

Creazione nuovo utente: rotta POST /auth/register
Login utente: rotta POST /auth/login
Proteggete, attraverso un middleware che verifichi il token JWT passato nell'header della richiesta, le rotte di creazione, modifica e cancellazione della risorsa Post.
Aggiungete la policy CORS per consentire a qualunque dominio di accedere alle API (tanto siamo in locale :linguaccia_occhi_chiusi:).

BONUS:

Aggiungete una relazione one-to-many fra i modelli User e Post.
Aggiungete un middleware che verifichi che un utente possa modificare o cancellare solo i Post a lui associati, altrimenti restituisca un errore 403.