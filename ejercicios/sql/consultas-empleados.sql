-- Consulta 1: Mostrar los nombres de los empleados ordenados alfabéticamente (Z...A)

SELECT NOMBRES
FROM EMPLEADOS
ORDER BY NOMBRES DESC;

-- Consulta 2: Seleccionar el nombre, el puesto y la localidad donde trabajan los empleados con puesto de ‘Soporte’.

SELECT e.NOMBRES, p.PUESTO, l.LOCALIDAD
FROM EMPLEADOS e
INNER JOIN PUESTOS p ON e.PUESTO_ID = p.ID
INNER JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
INNER JOIN LOCALIDADES l ON d.LOCALIDAD_ID = l.ID
WHERE p.PUESTO = 'Soporte';


-- Consulta 3: Listar los nombres de los empleados cuyo nombre termine con la letra ‘o’.

SELECT NOMBRES
FROM EMPLEADOS
WHERE NOMBRES LIKE '%o';

-- Consulta 4: Seleccionar el nombre, el puesto y sueldo de los empleados que trabajan en la localidad Carlos Paz.

SELECT e.NOMBRES, p.PUESTO, e.SUELDO
FROM EMPLEADOS e
INNER JOIN PUESTOS p ON e.PUESTO_ID = p.ID
INNER JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
INNER JOIN LOCALIDADES l ON d.LOCALIDAD_ID = l.ID
WHERE l.LOCALIDAD = 'Carlos Paz';

-- Consulta 5: Seleccionar el nombre, sueldo y localidad donde trabajan de los empleados que tengan un sueldo entre 10000 y 13000.

SELECT e.NOMBRES, e.SUELDO, l.LOCALIDAD
FROM EMPLEADOS e
INNER JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
INNER JOIN LOCALIDADES l ON d.LOCALIDAD_ID = l.ID
WHERE e.SUELDO BETWEEN 10000 AND 13000;

-- Consulta 6: Visualizar los departamentos con más de 5 empleados.

SELECT d.DENOMINACION, COUNT(e.ID) as CANTIDAD_EMPLEADOS
FROM DEPARTAMENTOS d
INNER JOIN EMPLEADOS e ON d.ID = e.DEPARTAMENTO_ID
GROUP BY d.ID, d.DENOMINACION
HAVING COUNT(e.ID) > 5;

-- Consulta 7: Nombre de los empleados que trabajan en Córdoba y cuyo puesto sea ‘Analista’ o ‘Programador’.

SELECT e.NOMBRES, p.PUESTO, l.LOCALIDAD
FROM EMPLEADOS e
INNER JOIN PUESTOS p ON e.PUESTO_ID = p.ID
INNER JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
INNER JOIN LOCALIDADES l ON d.LOCALIDAD_ID = l.ID
WHERE l.LOCALIDAD = 'Córdoba' 
AND (p.PUESTO = 'Analista' OR p.PUESTO = 'Programador');

-- Consulta 8: Calcula el sueldo medio de todos los empleados.

SELECT AVG(SUELDO) as SUELDO_MEDIO
FROM EMPLEADOS;

-- Consulta 9: Cuál es el máximo sueldo de los empleados del departamento 10?

SELECT MAX(e.SUELDO) as SUELDO_MAXIMO
FROM EMPLEADOS e
WHERE e.DEPARTAMENTO_ID = 10;

-- Consulta 10: Calcula el sueldo mínimo de los empleados del departamento ‘Soporte’.

SELECT MIN(e.SUELDO) as SUELDO_MINIMO
FROM EMPLEADOS e
INNER JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
WHERE d.DENOMINACION = 'Soporte';

-- Consulta 11: Para cada puesto obtener la suma de sueldos.

SELECT p.PUESTO, SUM(e.SUELDO) as SUMA_SUELDOS
FROM EMPLEADOS e
INNER JOIN PUESTOS p ON e.PUESTO_ID = p.ID
GROUP BY p.ID, p.PUESTO
ORDER BY SUM(e.SUELDO) DESC;