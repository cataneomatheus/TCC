﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TCC.Repository;

namespace TCC.Repository.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200129013603_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("TCC.Domain.curso.Evento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataEvento");

                    b.Property<string>("Email");

                    b.Property<string>("ImagemURL");

                    b.Property<string>("Local");

                    b.Property<int>("QtdPessoas");

                    b.Property<string>("Telefone");

                    b.Property<string>("Tema");

                    b.HasKey("Id");

                    b.ToTable("Eventos");
                });

            modelBuilder.Entity("TCC.Domain.curso.Lote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("DataFim");

                    b.Property<DateTime?>("DataInicio");

                    b.Property<int>("EventoId");

                    b.Property<string>("Nome");

                    b.Property<decimal>("Preco");

                    b.Property<int>("Quantidade");

                    b.HasKey("Id");

                    b.HasIndex("EventoId");

                    b.ToTable("Lotes");
                });

            modelBuilder.Entity("TCC.Domain.curso.Palestrante", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("ImagemURL");

                    b.Property<string>("MiniCurriculo");

                    b.Property<string>("Nome");

                    b.Property<string>("Telefone");

                    b.HasKey("Id");

                    b.ToTable("Palestrantes");
                });

            modelBuilder.Entity("TCC.Domain.curso.PalestranteEvento", b =>
                {
                    b.Property<int>("EventoId");

                    b.Property<int>("PalestranteId");

                    b.HasKey("EventoId", "PalestranteId");

                    b.HasIndex("PalestranteId");

                    b.ToTable("PalestranteEventos");
                });

            modelBuilder.Entity("TCC.Domain.curso.RedeSocial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EventoId");

                    b.Property<string>("Nome");

                    b.Property<int?>("PalestranteId");

                    b.Property<string>("URL");

                    b.HasKey("Id");

                    b.HasIndex("EventoId");

                    b.HasIndex("PalestranteId");

                    b.ToTable("RedeSociais");
                });

            modelBuilder.Entity("TCC.Domain.curso.Lote", b =>
                {
                    b.HasOne("TCC.Domain.curso.Evento", "Evento")
                        .WithMany("Lotes")
                        .HasForeignKey("EventoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TCC.Domain.curso.PalestranteEvento", b =>
                {
                    b.HasOne("TCC.Domain.curso.Evento", "Evento")
                        .WithMany("PalestranteEventos")
                        .HasForeignKey("EventoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TCC.Domain.curso.Palestrante", "Palestrante")
                        .WithMany("PalestranteEventos")
                        .HasForeignKey("PalestranteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TCC.Domain.curso.RedeSocial", b =>
                {
                    b.HasOne("TCC.Domain.curso.Evento", "Evento")
                        .WithMany("RedesSociais")
                        .HasForeignKey("EventoId");

                    b.HasOne("TCC.Domain.curso.Palestrante", "Palestrante")
                        .WithMany("RedessSociais")
                        .HasForeignKey("PalestranteId");
                });
#pragma warning restore 612, 618
        }
    }
}
