package com.example.demo.model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity //transfoma em uma entidade, cria uma tabela no BD
public class Tarefas {

	@Id //identifica a entidade
	@GeneratedValue(strategy = GenerationType.IDENTITY) //o bd incrementa o ID
	private Long id;
	
	@Column(nullable = false)
	private String descricao;
	
	@ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;
	
	public Projeto getProjeto(Long projetoId) {
		return projeto;
	}

	public void setProjeto(Projeto projeto) {
		this.projeto = projeto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Tarefas other = (Tarefas) obj;
		return Objects.equals(id, other.id);
	}


}