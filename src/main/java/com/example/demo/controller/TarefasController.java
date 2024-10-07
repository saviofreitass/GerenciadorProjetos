package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Projeto;
import com.example.demo.model.Tarefas;
import com.example.demo.repository.ProjetosRepository;
import com.example.demo.repository.TarefasRepository;

@RestController
@RequestMapping("/projetos/{projetoId}/tarefas")
@CrossOrigin(origins = "*")
public class TarefasController {
	
	@Autowired
	private ProjetosRepository ProjetosRepository;
	
	@Autowired
	private TarefasRepository TarefasRepository;
	
	@GetMapping
	public ResponseEntity<List<Tarefas>> listar(@PathVariable Long projetoId){
		
		List<Tarefas> tarefas = TarefasRepository.findByProjetoId(projetoId);
		
		if(tarefas.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		
		
		return ResponseEntity.ok(tarefas);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Tarefas> buscarPorId(@PathVariable Long id) {
        return TarefasRepository.findById(id)
            .map(tarefas -> ResponseEntity.ok(tarefas)) 
            .orElse(ResponseEntity.notFound().build()); 
    }
	
	@PostMapping
	public ResponseEntity<Tarefas> adicionar(@PathVariable Long projetoId, @RequestBody Tarefas tarefas) {
		Optional<Projeto> projetoOptional = ProjetosRepository.findById(projetoId);
		
		if(!projetoOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		
		Projeto projeto = projetoOptional.get();
		tarefas.setProjeto(projeto);
		
		Tarefas novaTarefa = TarefasRepository.save(tarefas);
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body(novaTarefa);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id){
		if(TarefasRepository.existsById(id)) {
			TarefasRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}else{
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Tarefas> atualizar(@PathVariable Long id, @RequestBody Tarefas tarefaAtualizada){
		return TarefasRepository.findById(id).map(tarefas -> {
			tarefas.setDescricao(tarefaAtualizada.getDescricao());
			Tarefas tarefaSalva = TarefasRepository.save(tarefas);
			return ResponseEntity.ok(tarefaSalva);
		}).orElse(ResponseEntity.notFound().build());
	}
	
	
}
