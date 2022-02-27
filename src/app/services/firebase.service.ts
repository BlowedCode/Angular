import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserData, UserData } from '../models';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
    constructor(public db: AngularFirestore) {}

    /*Con collection.add() posso aggiungere a qualunque table
      un nuovo record basandomi su un DTO che passo a DB   */
    public RegisterUser() {
        this.db.collection('REG.Users').add({
            username: "dummy",
            password: "dummy",
            email: "test@test.com",
            dtregister: new Date(),
            dtlastlogin: new Date()
        });
    }

    /*Metodo per ritornare la lista di un determinato oggetto,
       aggiungendo l'ID tra i suoi campi                   */
    public GetUsers(): Observable<UserData[]> {
        let RawUsers = this.db.collection<IUserData>('REG.Users');
        return RawUsers.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as IUserData;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    /*Metodo per ritornare il dettaglio di un determinato oggetto,
       basandomi sull'ID passato nei parametri                  */
    public GetUser(idUser: string): Observable<UserData> {
        let RawUser = this.db.collection<IUserData>('REG.Users').doc(idUser);
        return RawUser.snapshotChanges().pipe(
            map(a => {
                const data = a.payload.data() as IUserData;
                const id = a.payload.id;
                return { id, ...data }
            })
        );
    }

    /*.then(res=> {successo}, err => {errore}) dove viene utilizzato*/
    public UpdatePassword(idUser: string, data: IUserData) {
        return this.db.collection('REG.Users').doc(idUser).set(data);
    }

    /*.then(res=> {successo}, err => {errore}) dove viene utilizzato*/
    public DeleteUser(idUser: string) {
        return this.db.collection('REG.Users').doc(idUser).delete();
    }

    /* SEARCH EXAMPLE
    searchUsers(searchValue){
        return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
            .where('nameToSearch', '<=', searchValue + '\uf8ff'))
            .snapshotChanges()
    }
    */
}