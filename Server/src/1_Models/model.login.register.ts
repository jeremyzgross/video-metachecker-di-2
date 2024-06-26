import bcrypt from 'bcrypt'
// import { Transaction } from 'knex';
import { db } from '../0_Config/config.js';

import { userData, User, userLogin } from '../Interfaces/interface.js';

export const _registerUser = async (userData: userData) :Promise <{ user: User }>  => {

  let trx

  try{
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    trx = await db.transaction()

    const existingUser = await trx('users').where('username', userData.username).first()

    if (existingUser) {
      throw new Error('Username is already taken')
    }
    const [user] = await trx('users').insert(
    {
        first_name: userData.first_name,
        last_name: userData.last_name,
        username:  userData.username,
        email:  userData.email,
      },
      ['id', 'username', 'email', 'first_name', 'last_name']
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

export const _loginUser = async(userLogin:userLogin) :Promise <{user: User}> =>{
  try{
    const [user] = await db('users')
      .select(
        'users.username',
        'hashpwd.password',
        'users.first_name',
        'users.id'
      ).where({'users.username': userLogin.username})
      .leftJoin('hashpwd', 'users.id', 'hashpwd.user_id')
    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }catch (error) {
    console.error(error);
    throw error; //
  }
}
