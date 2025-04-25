import pyodbc
import psycopg2
import logging

# Configurar el logging para tener un registro detallado
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Conexión a SQL Server
try:
    logging.info("Conectando a SQL Server...")
    sql_conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=192.168.50.51;'  # Cambia a la IP o nombre del servidor de tu SQL Server
        'DATABASE=serviparamo;'
        'UID=sa;'
        'PWD=Clave01.;'
        'TrustServerCertificate=yes;'
    )
    sql_cursor = sql_conn.cursor()
    logging.info("Conexión exitosa a SQL Server.")
except Exception as e:
    logging.error(f"Error al conectar con SQL Server: {e}")
    exit()

# Ejecutar consulta en SQL Server
try:
    logging.info("Ejecutando consulta en SQL Server...")
    sql_cursor.execute("""SELECT agencia, numfac, undnegocio, pedido, agencia2, orden_ped, num_aceptacion, obra, nitced, convenio, fch_fac, fch_rad, fch_ven, vlr_fac, vlr_ant, vlr_ndb, vlr_ncr, vlr_ret, vlr_fle, vlr_cob, dscto, iva, estado, observa01, observa02, 
                         observa03, monto, dir, ciu, subtotal, vlrdscto, vlriva, rtefte, vlrrtefte, total, periodo, ageradica, aiu, a, i, u, vlr_a, vlr_i, vlr_u, vlriva_ut, vlr_anticipo, vlr_rtegtia, RteCree, vlr_rteCree, anula_factura, usuario_radica, fecha_radica, 
                         observa_radica, observacion_interna, observacion_externa, observacion_pago, responsable, usuario, fechagr, fecham, soportes, tipo_factura, TRM, TRM_ANT, dolar, dolar_ok, fe_emitir, fe_emitir_fecha, fe_xml_factura, 
                         fe_codigo_cufer, fe_respuesta_cufer, fe_representacion_grafica, fe_UUID, rteiva, vlrrteiva from com_cxca01 where nomsis='FA' and year(fch_fac)>=2018 """)  # Asegúrate de que esta tabla exista
    rows = sql_cursor.fetchall()  # Obtener todos los resultados
    logging.info(f"Se obtuvieron {len(rows)} filas desde SQL Server.")
except Exception as e:
    logging.error(f"Error al ejecutar la consulta en SQL Server: {e}")
    exit()

# Conexión a PostgreSQL
try:
    logging.info("Conectando a PostgreSQL...")
    pg_conn = psycopg2.connect(
        "dbname=serviparamo user=postgres password=Clave01. host=localhost port=5433"
    )
    pg_cursor = pg_conn.cursor()
    logging.info("Conexión exitosa a PostgreSQL.")
except Exception as e:
    logging.error(f"Error al conectar con PostgreSQL: {e}")
    exit()

# Insertar los datos obtenidos de SQL Server en PostgreSQL
try:
    logging.info("Insertando datos en PostgreSQL...")
    for row in rows:
        pg_cursor.execute(
            """INSERT INTO invoices(agencia, numfac, undnegocio, pedido, agencia2, orden_ped, num_aceptacion, obra, nitced, convenio, fch_fac, fch_rad, fch_ven, vlr_fac, vlr_ant, vlr_ndb, vlr_ncr, vlr_ret, vlr_fle, vlr_cob, dscto, iva, estado, observa01, observa02, 
                         observa03, monto, dir, ciu, subtotal, vlrdscto, vlriva, rtefte, vlrrtefte, total, periodo, ageradica, aiu, a, i, u, vlr_a, vlr_i, vlr_u, vlriva_ut, vlr_anticipo, vlr_rtegtia, RteCree, vlr_rteCree, anula_factura, usuario_radica, fecha_radica, 
                         observa_radica, observacion_interna, observacion_externa, observacion_pago, responsable, usuario, fechagr, fecham, soportes, tipo_factura, TRM, TRM_ANT, dolar, dolar_ok, fe_emitir, fe_emitir_fecha, fe_xml_factura, 
                         fe_codigo_cufer, fe_respuesta_cufer, fe_representacion_grafica, fe_UUID, rteiva, vlrrteiva) 
                         VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                         %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                         %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                         %s, %s, %s, %s, %s, %s )""", row
        )
    pg_conn.commit()  # Confirmar la transacción
    logging.info("Datos insertados exitosamente en PostgreSQL.")
except Exception as e:
    logging.error(f"Error al insertar datos en PostgreSQL: {e}")
    pg_conn.rollback()  # Si hay error, revertir la transacción

# Cerrar las conexiones
finally:
    sql_cursor.close()
    sql_conn.close()
    pg_cursor.close()
    pg_conn.close()
    logging.info("Conexiones cerradas.")
