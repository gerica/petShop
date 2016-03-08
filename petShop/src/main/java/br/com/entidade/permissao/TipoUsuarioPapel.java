package br.com.entidade.permissao;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonBackReference;

/**
 * The persistent class for the tb_tipo_usuario_papel database table.
 * 
 */
@Entity
@Table(name = "tb_tipo_usuario_papel")
public class TipoUsuarioPapel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_tipo_usuario_papel")
	private Integer idTipoUsuarioPapel;

	// bi-directional many-to-one association to Papel
	@ManyToOne
	@JoinColumn(name = "id_papel")
	private Papel papel;

	// bi-directional many-to-one association to TipoUsuario
	@ManyToOne
	@JoinColumn(name = "id_tipo_usuario")
	@JsonBackReference("tipoUsuarioPapel")
	private TipoUsuario tipoUsuario;

	public TipoUsuarioPapel() {
	}

	public Integer getIdTipoUsuarioPapel() {
		return this.idTipoUsuarioPapel;
	}

	public void setIdTipoUsuarioPapel(Integer idTipoUsuarioPapel) {
		this.idTipoUsuarioPapel = idTipoUsuarioPapel;
	}

	public Papel getPapel() {
		return papel;
	}

	public void setPapel(Papel papel) {
		this.papel = papel;
	}

	public TipoUsuario getTipoUsuario() {
		return tipoUsuario;
	}

	public void setTipoUsuario(TipoUsuario tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}

}