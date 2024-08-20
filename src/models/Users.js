import { hash } from "bcrypt";
import { pool } from "../config/db.js";

export class User {
    static async userId(id) {
        const user = await pool.execute('SELECT * FROM users WHERE id=?', [id])
   
        return user[0]
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows;
    }


    static async createUser(email, password) {
        const passEnc = await hash(password, 10)
        const newUser = await pool.execute('INSERT INTO users ( email, password) VALUES (?,?)', [email, passEnc])
    
        return newUser[0]
    }

    static async editUser(id, name, biography, phone, email, password, photo) {
        const sql = []
        const values = []
console.log(photo);
        if (name) {
            sql.push('name=?,')
            values.push(name)
        }
        if (biography) {
            sql.push('biography=?,')
            values.push(biography)
        }
        if (phone) {
            sql.push('phone=?,')
            values.push(phone)
        }
        if (email) {
            sql.push('email=?,')
            values.push(email)
        }
        if (password) {
            const passEnc = await hash(password, 10)
            sql.push('password=?,')
            values.push(passEnc)
        }

        if (photo) {
            sql.push('photo=?,')
            console.log(photo);
            values.push(photo)
        }

        const sqlString = sql.join(' ').slice(0, -1)
       values.push(id)
        
        const userEdit = await pool.execute(`UPDATE users SET ${sqlString} WHERE id=?`, values)
        return userEdit[0]
    }

    static async log(email) {
        const user = await pool.execute('SELECT * FROM users WHERE email=?', [email])

        return user[0]
    }
}
