import bcrypt from 'bcrypt'
// import { Transaction } from 'knex';
import { db } from '../0_Config/config.js';

interface userData{
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
}
interface User {
  id: number;
}
export const _registerUser = async (userData: userData) :Promise <{ user: User }>  => {

  let trx

  try{
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    trx = await db.transaction()

  const [user] = await trx('users').insert(
    {
        first_name: userData.first_name,
        last_name: userData.last_name,
        username:  userData.username,
        email:  userData.email,
      },
      ['id']
    )

    await trx('hashpwd').insert({
      user_id:user.id,
      password: hashedPassword
    })

    await trx.commit()
    
    return{
      user
    }
  } catch (error) {
    if (trx) {
      await trx.rollback()
    }
    console.error('Error registering user:', error)
    throw new Error('Internal Server Error')
  }
}

