package br.com.projetofinal.dao;

import org.springframework.data.repository.CrudRepository;

import br.com.projetofinal.model.Usuario;
/*
 * CRUD => Create Read Update Delete
 * DAO => Data Access Object => CRUD SEMPRE deve estar no DAO
 */
public interface UsuarioDAO extends CrudRepository<Usuario,Integer>{
	
	public Usuario findByEmailAndSenha(String email, String senha);
	
	public Usuario findByRacfAndSenha(String racf, String senha);

	
	// @Query("select...") para proc e view tb
}
