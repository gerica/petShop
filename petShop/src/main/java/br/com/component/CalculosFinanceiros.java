package br.com.component;

public class CalculosFinanceiros {

	/**
	 * Calcular juros compostos
	 * 
	 * @param principal
	 *            valor inicial
	 * @param taxa
	 *            a ser paga
	 * @param meses
	 *            prazo
	 * @return retornará os juros pagos
	 */
	public static Double calcularJurosCompostosJuros(Double principal, Double taxa, int meses) {
		double juros = calcularJurosCompostosMontante(principal, taxa, meses) - principal;
		return juros;
	}

	/**
	 * Calcular juros compostos
	 * 
	 * @param principal
	 *            valor inicial
	 * @param taxa
	 *            a ser paga
	 * @param meses
	 *            prazo
	 * @return retornará os juros montante
	 */
	public static Double calcularJurosCompostosMontante(Double principal, Double taxa, int meses) {

		double montante = principal * Math.pow((1 + (taxa/12)), meses);
		return montante;
	}

	public static Double calcularVariacaoEntreValores(Double valor1, Double valor2) {
		if (valor1 > 0) {
			return ((valor2 * 100) / valor1) / 100;
		}
		return 0.0;
	}

//	public static void main(String args[]) {
//		double principal = 10000.00;
//		double taxa = 0.0099999998;
//		int meses = 10;
//		double anterior = 0.0;
//
//		for (int i = 1; i <= meses; i++) {
//			double montante = calcularJurosCompostosMontante(principal, taxa, i);
//			double juros = calcularJurosCompostosJuros(principal, taxa, i) - anterior;
//			anterior += juros;
//			// System.out.println("Mês: " + i + " - Montante: " + montante +
//			// " - Juros: " + juros);
//		}
//
//		double montante = calcularJurosCompostosMontante(principal, taxa, 0);
//		// System.out.println(montante);
//
//		System.out.println(calcularVariacaoEntreValores(103072.0, 104072.0 - 103071.0));
//
//		System.exit(0);
//	}
}
