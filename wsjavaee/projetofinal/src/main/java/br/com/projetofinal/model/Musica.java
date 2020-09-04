package br.com.projetofinal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity //JPA
@Table(name="TB_MUSICA")
public class Musica {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	@Column(name="id")
	private int id;
	
	@Column(name="titulo")
	private String titulo;
	
	//@OneToMany (lado da chave primaria) e ManyToOne (lado da chave estrangeira)
	@ManyToOne
	@JsonIgnoreProperties("musicas")
	private Artista artista;
	
	@Column(name="ano")
	private int ano;
	
	public Musica() {
		super();
	}
	public Musica(int id, String titulo, Artista artista, int ano) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.artista = artista;
		this.ano = ano;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public Artista getArtista() {
		return artista;
	}
	public void setArtista(Artista artista) {
		this.artista = artista;
	}
	public int getAno() {
		return ano;
	}
	public void setAno(int ano) {
		this.ano = ano;
	}
	
	
}
