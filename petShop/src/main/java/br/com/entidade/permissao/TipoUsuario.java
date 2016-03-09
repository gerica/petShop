package br.com.entidade.permissao;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * The persistent class for the tb_tipo_usuario database table.
 * 
 */
@Entity
@Table(name = "tb_tipo_usuario")
public class TipoUsuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_tipo_usuario")
	private Integer idTipoUsuario;

	@Column(name = "ds_tipo_usuario")
	private String dsTipoUsuario;

	// bi-directional many-to-one association to TipoUsuario
	@ManyToOne
	@JoinColumn(name = "id_tipo_usuario_pai")
	private TipoUsuario tipoUsuarioPai;

	// bi-directional many-to-one association to TipoUsuarioPapel
	@OneToMany(mappedBy = "tipoUsuario", fetch = FetchType.EAGER)
	@JsonManagedReference("tipoUsuarioPapel")
	private List<TipoUsuarioPapel> tipoUsuarioPapels;

	public TipoUsuario() {
	}

	public Integer getIdTipoUsuario() {
		return this.idTipoUsuario;
	}

	public void setIdTipoUsuario(Integer idTipoUsuario) {
		this.idTipoUsuario = idTipoUsuario;
	}

	public String getDsTipoUsuario() {
		return this.dsTipoUsuario;
	}

	public void setDsTipoUsuario(String dsTipoUsuario) {
		this.dsTipoUsuario = dsTipoUsuario;
	}

	public List<TipoUsuarioPapel> getTipoUsuarioPapels() {
		return tipoUsuarioPapels;
	}

	public void setTipoUsuarioPapels(List<TipoUsuarioPapel> tipoUsuarioPapels) {
		this.tipoUsuarioPapels = tipoUsuarioPapels;
	}

	public TipoUsuarioPapel addTipoUsuarioPapel(TipoUsuarioPapel tipoUsuarioPapel) {
		getTipoUsuarioPapels().add(tipoUsuarioPapel);
		tipoUsuarioPapel.setTipoUsuario(this);

		return tipoUsuarioPapel;
	}

	public TipoUsuarioPapel removeTipoUsuarioPapel(TipoUsuarioPapel tipoUsuarioPapel) {
		getTipoUsuarioPapels().remove(tipoUsuarioPapel);
		tipoUsuarioPapel.setTipoUsuario(null);

		return tipoUsuarioPapel;
	}

	public TipoUsuario getTipoUsuarioPai() {
		return tipoUsuarioPai;
	}

	public void setTipoUsuarioPai(TipoUsuario tipoUsuarioPai) {
		this.tipoUsuarioPai = tipoUsuarioPai;
	}

}