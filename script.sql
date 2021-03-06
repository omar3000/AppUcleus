USE [master]
GO
/****** Object:  Database [appU]    Script Date: 06/08/2018 06:46:13 p. m. ******/
CREATE DATABASE [appU]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'mydb', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\mydb.mdf' , SIZE = 4160KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'mydb_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\mydb_log.ldf' , SIZE = 1040KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [appU] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [appU].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [appU] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [appU] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [appU] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [appU] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [appU] SET ARITHABORT OFF 
GO
ALTER DATABASE [appU] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [appU] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [appU] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [appU] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [appU] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [appU] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [appU] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [appU] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [appU] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [appU] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [appU] SET  ENABLE_BROKER 
GO
ALTER DATABASE [appU] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [appU] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [appU] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [appU] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [appU] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [appU] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [appU] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [appU] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [appU] SET  MULTI_USER 
GO
ALTER DATABASE [appU] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [appU] SET DB_CHAINING OFF 
GO
ALTER DATABASE [appU] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [appU] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [appU]
GO
/****** Object:  Table [dbo].[calificaciones]    Script Date: 06/08/2018 06:46:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calificaciones](
	[idCalificacion] [int] IDENTITY(1,1) NOT NULL,
	[calificacion] [decimal](2, 2) NOT NULL,
	[fkUsuario] [int] NOT NULL,
	[fkNegocio] [int] NOT NULL,
	[fecha] [date] NOT NULL,
 CONSTRAINT [PK_calificaciones] PRIMARY KEY CLUSTERED 
(
	[idCalificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[categorias]    Script Date: 06/08/2018 06:46:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categorias](
	[idCategoria] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_categorias] PRIMARY KEY CLUSTERED 
(
	[idCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[detalleVenta]    Script Date: 06/08/2018 06:46:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detalleVenta](
	[idDetalle] [int] IDENTITY(1,1) NOT NULL,
	[precio] [money] NOT NULL,
	[observacion] [nvarchar](50) NULL,
	[cantidad] [int] NOT NULL,
	[fkProducto] [int] NOT NULL,
	[fkVenta] [int] NOT NULL,
 CONSTRAINT [PK_detalleVenta] PRIMARY KEY CLUSTERED 
(
	[idDetalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[negocios]    Script Date: 06/08/2018 06:46:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[negocios](
	[idNegocio] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NOT NULL,
	[descripcion] [nvarchar](50) NOT NULL,
	[imgNegocio] [nvarchar](50) NULL,
	[calle] [nvarchar](50) NOT NULL,
	[numero] [int] NOT NULL,
	[colonia] [nvarchar](50) NOT NULL,
	[ciudad] [nvarchar](50) NOT NULL,
	[codigoPostal] [int] NULL,
	[latitud] [float] NULL,
	[longitud] [float] NULL,
	[fkUsuario] [int] NOT NULL,
	[precioEnvio] [money] NULL,
	[permitePagosTarjeta] [bit] NULL,
	[activo] [bit] NULL,
	[correo] [nvarchar](50) NULL,
 CONSTRAINT [PK__negocios__70E1E107AF496B3F] PRIMARY KEY CLUSTERED 
(
	[idNegocio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[productos]    Script Date: 06/08/2018 06:46:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[productos](
	[idProducto] [int] IDENTITY(1,1) NOT NULL,
	[producto] [nvarchar](50) NOT NULL,
	[descripcion] [nvarchar](250) NOT NULL,
	[imgProducto] [nvarchar](50) NULL,
	[activo] [bit] NOT NULL,
	[precio] [money] NOT NULL,
	[fkNegocio] [int] NULL,
	[fechaRegistro] [date] NULL,
	[fkCategoria] [int] NOT NULL,
 CONSTRAINT [PK_productos] PRIMARY KEY CLUSTERED 
(
	[idProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ubicaciones]    Script Date: 06/08/2018 06:46:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ubicaciones](
	[idubicacion] [int] IDENTITY(1,1) NOT NULL,
	[fkUsuario] [int] NOT NULL,
	[latitud] [float] NOT NULL,
	[longitud] [float] NOT NULL,
 CONSTRAINT [PK_ubicaciones] PRIMARY KEY CLUSTERED 
(
	[idubicacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 06/08/2018 06:46:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NOT NULL,
	[apellidoPaterno] [nvarchar](50) NOT NULL,
	[apellidoMaterno] [nvarchar](50) NOT NULL,
	[usuario] [nvarchar](50) NOT NULL,
	[correo] [nvarchar](50) NOT NULL,
	[contraseña] [nvarchar](50) NOT NULL,
	[activo] [bit] NULL,
	[fechaRegistro] [date] NOT NULL,
	[fkNegocio] [int] NULL,
	[repartidor] [bit] NULL,
 CONSTRAINT [PK_usuarios] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ventas]    Script Date: 06/08/2018 06:46:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ventas](
	[idventa] [int] IDENTITY(1,1) NOT NULL,
	[fechaPedido] [datetime] NOT NULL,
	[fechaPreparado] [datetime] NULL,
	[fechaentregado] [datetime] NULL,
	[fechaCancelado] [datetime] NULL,
	[fkUsuarioPedido] [int] NOT NULL,
	[fkNegocio] [int] NOT NULL,
	[fkubicacionPedido] [int] NOT NULL,
	[fkUsuarioRepartidor] [int] NULL,
	[fkubicacionRepartidor] [int] NULL,
	[total] [money] NOT NULL,
	[estatus] [int] NULL,
	[pagoConTarjeta] [bit] NULL,
 CONSTRAINT [PK_ventas] PRIMARY KEY CLUSTERED 
(
	[idventa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[negocios] ADD  CONSTRAINT [DF__negocios__nombre__0F975522]  DEFAULT (NULL) FOR [nombre]
GO
ALTER TABLE [dbo].[negocios] ADD  CONSTRAINT [DF__negocios__calle__108B795B]  DEFAULT (NULL) FOR [descripcion]
GO
ALTER TABLE [dbo].[negocios] ADD  CONSTRAINT [DF__negocios__activo__117F9D94]  DEFAULT (NULL) FOR [imgNegocio]
GO
ALTER TABLE [dbo].[negocios] ADD  CONSTRAINT [DF__negocios__coloni__1367E606]  DEFAULT (NULL) FOR [calle]
GO
ALTER TABLE [dbo].[negocios] ADD  CONSTRAINT [DF__negocios__numero__15502E78]  DEFAULT (NULL) FOR [numero]
GO
ALTER TABLE [dbo].[negocios] ADD  CONSTRAINT [DF__negocios__munici__145C0A3F]  DEFAULT (NULL) FOR [colonia]
GO
ALTER TABLE [dbo].[negocios] ADD  CONSTRAINT [DF_negocios_precioEnvio]  DEFAULT ((0)) FOR [precioEnvio]
GO
ALTER TABLE [dbo].[negocios] ADD  CONSTRAINT [DF_negocios_activo]  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[calificaciones]  WITH CHECK ADD  CONSTRAINT [FK_calificaciones_negocios] FOREIGN KEY([fkNegocio])
REFERENCES [dbo].[negocios] ([idNegocio])
GO
ALTER TABLE [dbo].[calificaciones] CHECK CONSTRAINT [FK_calificaciones_negocios]
GO
ALTER TABLE [dbo].[calificaciones]  WITH CHECK ADD  CONSTRAINT [FK_calificaciones_usuarios] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[calificaciones] CHECK CONSTRAINT [FK_calificaciones_usuarios]
GO
ALTER TABLE [dbo].[detalleVenta]  WITH CHECK ADD  CONSTRAINT [FK_detalleVenta_productos] FOREIGN KEY([fkProducto])
REFERENCES [dbo].[productos] ([idProducto])
GO
ALTER TABLE [dbo].[detalleVenta] CHECK CONSTRAINT [FK_detalleVenta_productos]
GO
ALTER TABLE [dbo].[detalleVenta]  WITH CHECK ADD  CONSTRAINT [FK_detalleVenta_ventas] FOREIGN KEY([fkVenta])
REFERENCES [dbo].[ventas] ([idventa])
GO
ALTER TABLE [dbo].[detalleVenta] CHECK CONSTRAINT [FK_detalleVenta_ventas]
GO
ALTER TABLE [dbo].[negocios]  WITH CHECK ADD  CONSTRAINT [FK_negocios_usuarios] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[negocios] CHECK CONSTRAINT [FK_negocios_usuarios]
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [FK_productos_categorias] FOREIGN KEY([fkCategoria])
REFERENCES [dbo].[categorias] ([idCategoria])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [FK_productos_categorias]
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [FK_productos_negocios] FOREIGN KEY([fkNegocio])
REFERENCES [dbo].[negocios] ([idNegocio])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [FK_productos_negocios]
GO
ALTER TABLE [dbo].[ubicaciones]  WITH CHECK ADD  CONSTRAINT [FK_ubicaciones_usuarios] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[ubicaciones] CHECK CONSTRAINT [FK_ubicaciones_usuarios]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [FK_usuarios_negocios] FOREIGN KEY([fkNegocio])
REFERENCES [dbo].[negocios] ([idNegocio])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [FK_usuarios_negocios]
GO
ALTER TABLE [dbo].[ventas]  WITH CHECK ADD  CONSTRAINT [FK_ventas_negocios] FOREIGN KEY([fkNegocio])
REFERENCES [dbo].[negocios] ([idNegocio])
GO
ALTER TABLE [dbo].[ventas] CHECK CONSTRAINT [FK_ventas_negocios]
GO
ALTER TABLE [dbo].[ventas]  WITH CHECK ADD  CONSTRAINT [FK_ventas_ubicaciones] FOREIGN KEY([fkubicacionPedido])
REFERENCES [dbo].[ubicaciones] ([idubicacion])
GO
ALTER TABLE [dbo].[ventas] CHECK CONSTRAINT [FK_ventas_ubicaciones]
GO
ALTER TABLE [dbo].[ventas]  WITH CHECK ADD  CONSTRAINT [FK_ventas_ubicaciones1] FOREIGN KEY([fkubicacionRepartidor])
REFERENCES [dbo].[ubicaciones] ([idubicacion])
GO
ALTER TABLE [dbo].[ventas] CHECK CONSTRAINT [FK_ventas_ubicaciones1]
GO
ALTER TABLE [dbo].[ventas]  WITH CHECK ADD  CONSTRAINT [FK_ventas_usuarios] FOREIGN KEY([fkUsuarioPedido])
REFERENCES [dbo].[usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[ventas] CHECK CONSTRAINT [FK_ventas_usuarios]
GO
ALTER TABLE [dbo].[ventas]  WITH CHECK ADD  CONSTRAINT [FK_ventas_usuarios1] FOREIGN KEY([fkUsuarioRepartidor])
REFERENCES [dbo].[usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[ventas] CHECK CONSTRAINT [FK_ventas_usuarios1]
GO
USE [master]
GO
ALTER DATABASE [appU] SET  READ_WRITE 
GO
