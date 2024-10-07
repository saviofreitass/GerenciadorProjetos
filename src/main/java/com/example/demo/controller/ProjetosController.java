package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Projeto;
import com.example.demo.repository.ProjetosRepository;
import com.example.demo.repository.TarefasRepository;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/projetos")
@CrossOrigin(origins = "*")
public class ProjetosController {
	
	@Autowired
	private ProjetosRepository ProjetosRepository;
	
	@Autowired
	private TarefasRepository TarefasRepository;
	
	@GetMapping
	public List<Projeto> listar() {
		return ProjetosRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Projeto> buscarPorId(@PathVariable Long id) {
        return ProjetosRepository.findById(id)
            .map(projeto -> ResponseEntity.ok(projeto)) 
            .orElse(ResponseEntity.notFound().build()); 
    }
	
	@PostMapping
	public Projeto adicionar(@RequestBody Projeto projeto) {
		return ProjetosRepository.save(projeto);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> deletar(@PathVariable Long id){
		if(ProjetosRepository.existsById(id)) {
			TarefasRepository.deleteByProjetoId(id);
			ProjetosRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Projeto> atualizar(@PathVariable Long id, @RequestBody Projeto projetoAtualizado) {
	    return ProjetosRepository.findById(id).map(projetos -> {
	                projetos.setNome(projetoAtualizado.getNome());
	                projetos.setDataEntrega(projetoAtualizado.getDataEntrega());
	                Projeto projetoSalvo = ProjetosRepository.save(projetos);
	                return ResponseEntity.ok(projetoSalvo);
	            }).orElse(ResponseEntity.notFound().build());
	}
}
