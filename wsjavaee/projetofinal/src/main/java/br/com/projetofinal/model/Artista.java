package br.com.projetofinal.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="TB_ARTISTA")
public class Artista {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="nomeartistico", length=30)
	private String nomeartistico;
	
	@Column(name="nacionalidade", length=30)
	private String nacionalidade;
	
	@OneToMany(mappedBy="artista", cascade=CascadeType.ALL)
	@JsonIgnoreProperties("artista")
	private List<Musica> musicas;
	
	@Column(name="nascimento")
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy")
	private Date nascimento;
	
	public Date getNascimento() {
		return nascimento;
	}

	public void setNascimento(Date nascimento) {
		this.nascimento = nascimento;
	}

	public List<Musica> getMusicas() {
		return musicas;
	}

	public void setMusicas(List<Musica> musicas) {
		this.musicas = musicas;
	}

	public Artista(int id, String nomeartistico, String nacionalidade, List<Musica> musicas, Date nascimento) {
		super();
		this.id = id;
		this.nomeartistico = nomeartistico;
		this.nacionalidade = nacionalidade;
		this.musicas = musicas;
		this.nascimento = nascimento;
	}

	public Artista() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNomeartistico() {
		return nomeartistico;
	}

	public void setNomeartistico(String nomeartistico) {
		this.nomeartistico = nomeartistico;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}
	
	
}
