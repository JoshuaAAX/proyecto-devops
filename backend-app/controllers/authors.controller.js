const pool = require('../db');

//obtener todos los autores
//params() -> return rowsAuthor
const getAllAuthors =  async (req, res, next) => {

    try{
        const result = await pool.query("SELECT * FROM author");
        return res.json(result.rows);
    }
    catch(error){
        next(error)
    }
}
 
//obtener un autor
//params(id.author) -> return rowS(id.author)
const getAuthor = async (req, res, next) => {

    try{
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM author WHERE id_author=$1", [id]);

        if(result.rows.length === 0){
            return res.status(404).json(
                {message: "Author no found --get"}
            );
        };

        return res.json(result.rows[0]);
    }
    catch(error){
        next(error)
    }
}

// crear autor
//params(name_author, nacionality) -> return rows(id_author)
const createAuthor = async (req, res, next) => {

    try{
        const {name_author, nacionality} = req.body;
        const result = await pool.query("INSERT INTO author VALUES (default, $1, $2) RETURNING *", 
                                        [name_author, nacionality]);

        return res.json(result.rows[0]);
    }
    catch(error){
        next(error)
    }
}

//borrar author
//params(id_author) -> return signal(204)
const deleteAuthor = async (req, res, next) => {

    try{
        const {id} = req.params;
        const result = await pool.query("DELETE FROM author WHERE id_author=$1", [id]);

        if(result.rowCount === 0){
            return res.status(404).json(
                {message: "Author no found --delete"}
            );
        }

        return res.sendStatus(204);
    }
    catch(error){
        next(error)
    }
}

//actualiza author
//params(id_author, author.body) -> returns rows(id_author)
const updateAuthor = async (req, res, next) => {

    try{
        const {id} = req.params;
        const {name_author, nacionality} = req.body;

        const result = await pool.query("UPDATE author SET name_author=$1, nacionality=$2 WHERE id_author=$3 RETURNING *", 
                                        [name_author, nacionality, id]);
        
      	if(result.rows.length === 0) {
            return res.status(404).json(
                 {message:"Author not found--update"}
          );
        };	
                                  
        return res.json(result.rows[0]);
    }
    catch(error){
        next(error)
    }
}


module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    deleteAuthor,
    updateAuthor
}