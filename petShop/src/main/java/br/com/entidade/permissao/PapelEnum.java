package br.com.entidade.permissao;

public enum PapelEnum {

	GERENTE(1, Constants.GERENTE), //
	VENDAS(2, Constants.VENDAS), //
	COMPRAS(3, Constants.COMPRAS), //
	VETERINARIO(4, Constants.VETERINARIO), //
	CONTABIL(5, Constants.CONTABIL), //
	FISCAL(6, Constants.FISCAL), //
	TOSARDOR(7, Constants.TOSARDOR), //
	ENCARREGADO_ESTOQUE(8, Constants.ENCARREGADO_ESTOQUE);

	private PapelEnum(Integer id, String descricao) {
	}

	public static class Constants {
		public static final String GERENTE = "GERENTE";
		public static final String VENDAS = "VENDAS";
		public static final String COMPRAS = "COMPRAS";
		public static final String VETERINARIO = "VETERINARIO";
		public static final String CONTABIL = "CONTABIL";
		public static final String FISCAL = "FISCAL";
		public static final String TOSARDOR = "TOSARDOR";
		public static final String ENCARREGADO_ESTOQUE = "ENCARREGADO ESTOQUE";
	}

}
