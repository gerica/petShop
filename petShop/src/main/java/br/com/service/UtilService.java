package br.com.service;

import java.util.List;

import br.com.entidade.auxiliar.Raca;
import br.com.entidade.auxiliar.TipoPet;
import br.com.entidade.permissao.TipoUsuario;

public interface UtilService {

	List<TipoPet> findAllTipoPet();

	List<Raca> findAllRaca();

	List<Raca> findRacaByTipo(Integer idTipoPet);

	List<TipoUsuario> findAllTipoUsuario();

}
