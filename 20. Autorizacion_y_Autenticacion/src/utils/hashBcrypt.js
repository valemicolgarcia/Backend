//BCrypt es una libreria de hasing de contrasenias

//1. Instalamos: npm install bcrypt
//2. importamos el modulo

import bcrypt from "bcrypt";

//se crean dos funciones:
//1. createHash: aplica el hasheo al password
//2. isValidPassword: compara el password proporcionado por la base de datos

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//hashSync(): toma el password que le pasamos y aplica el proceso a partir de un Salt.
//salt: es un string random que hace que el proceso de hasheo se realice de forma impredecible.

//en este caso generamos un salt de 10 caracteres.

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

//compara los password y me retorna true / false segun corresponda


