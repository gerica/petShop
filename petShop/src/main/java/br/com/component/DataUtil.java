package br.com.component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.joda.time.LocalDate;

public class DataUtil {

	public static final String PATTERN_DATA_1 = "dd MMM yyyy hh:mm:ss";
	public static final String PATTERN_DATA_2 = "dd/MM/yyyy";
	public static final String PATTERN_DATA_3 = "EEE, d MMM yyyy HH:mm:ss Z";
	public static final String PATTERN_DATA_4 = "EEE MMM D HH:mm:ss";
	public static final String PATTERN_DATA_5 = "dd/MM/yyyy hh:mm";

	/**
	 * Cria objeto data de acorco com o formatador, formato
	 * "EEE, d MMM yyyy HH:mm:ss Z"
	 * 
	 * @param stringDate
	 * @return
	 */
	public static Date parseToDate(String stringDate, String pattern) {
		SimpleDateFormat formatter = new SimpleDateFormat(pattern, Locale.ENGLISH);
		try {
			return formatter.parse(stringDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Cria objeto data com um formatado padrão
	 * 
	 * @param stringDate
	 * @return
	 */

	public static Date parseToDate(String stringDate) {
		String pattern = null;
		switch (stringDate.length()) {
		case 10:
			pattern = PATTERN_DATA_2;
			break;
		case 16:
			pattern = PATTERN_DATA_5;
			break;
		case 19:
			pattern = PATTERN_DATA_4;
			break;
		case 20:
			pattern = PATTERN_DATA_1;
			break;
		case 31:
			pattern = PATTERN_DATA_3;
			break;

		default:
			// throw new RuntimeException("A data é nula " + stringDate +
			// " ou não existe nehum formato válido");
			pattern = PATTERN_DATA_2;
			if (stringDate == null || stringDate.length() <= 0) {
				stringDate = "10/10/2014";
			}
			break;
		}

		return parseToDate(stringDate, pattern);
	}

//	public static int compareTo(Date dateOne, Date dateTwo) {
//		DateTime first = new DateTime(dateOne);
//		DateTime second = new DateTime(dateTwo);
//
//		LocalDate firstDate = first.toLocalDate();
//		LocalDate secondDate = second.toLocalDate();
//
//		return firstDate.compareTo(secondDate);
//	}

	/**
	 * 
	 * @param data1
	 * @param data2
	 * @return 0 - iqual
	 *  1 - data 1 maior que data 2
	 *  -1 - data 1 menor que data 2
	 */
	public static int compararData(Date data1, Date data2){
		LocalDate l1 = new LocalDate(data1);
		LocalDate l2 = new LocalDate(data2);
		return l1.compareTo(l2);
		
	}
	
	public static void main(String[] args) {
		String stData1 = "Thu, 07 May 2015 19:50:00 -0300";
		String stData2 = "07/05/2015";
		String stData3 = "04 May 2015 05:00:00";
		String stData4 = "Thu May 07 15:27:00";
		String stData5 = "13/05/2015 15:20";
		
		System.out.println(stData1.length());
		System.out.println(stData2.length());
		System.out.println(stData3.length());
		System.out.println(stData4.length());
		System.out.println(stData5.length());
		Date data1 = parseToDate(stData1);
		Date data2 = parseToDate(stData2);
		Date data3 = parseToDate(stData3);
		Date data4 = parseToDate(stData4);
		Date data5 = parseToDate(stData5);

		System.out.println(data3);
		System.out.println(data4);
		System.out.println(data5);
		System.out.println(compararData(data1, data2));
		
		
//		Date data1 = parseToDate("14 MAY 2015 10:10:00");
//		Date data2 = parseToDate("13 MAY 2015 23:11:00");
//		System.out.println(compararData(data1, data2));
//		System.out.println(compareTo(data1, data2));
	}
}
