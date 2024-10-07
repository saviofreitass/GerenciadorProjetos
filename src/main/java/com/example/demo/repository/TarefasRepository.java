package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Tarefas;

public interface TarefasRepository extends JpaRepository<Tarefas, Long> {

	List<Tarefas> findByProjetoId(Long projetoId);
	void deleteByProjetoId(Long projetoId);

}
