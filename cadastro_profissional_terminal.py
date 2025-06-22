def cadastrar_profissional():
    print("👷‍♂️ Fala meu amigo! Bora te cadastrar no ConectaPro pra você pegar trampo!")

    nome = input("➡️ Como você gosta de ser chamado? (Pode ser nome ou apelido): ")

    whatsapp = input("➡️ Me fala seu número de WhatsApp com DDD. Ex.: (69) 9XXXX-XXXX: ")

    profissao = input("➡️ Qual é seu serviço? (Pedreiro, Pintor, Eletricista, Ajudante, outro...): ")

    bairro = input("➡️ Qual é o bairro onde você mora?: ")

    experiencia = input("➡️ Há quantos anos você trabalha nesse serviço?: ")

    idade = input("➡️ Quantos anos você tem?: ")

    foto_perfil = input("➡️ Quer colocar uma foto sua? (S/N): ")
    if foto_perfil.lower() == "s":
        foto_perfil_link = input("📸 Me manda o link da sua foto ou descreve qual foto você quer usar: ")
    else:
        foto_perfil_link = "Sem foto"

    print("\n➡️ Agora me fala quais desses serviços você faz. Digite separados por vírgula se for mais de um:")
    print("- Forma e Concretagem")
    print("- Contra-Piso")
    print("- Cerâmica e Porcelanato")
    print("- Alvenaria")
    print("- Reboco")
    print("- Instalações Hidrosanitárias")
    print("- Instalações Elétricas")
    print("- Forro de Gesso")

    servicos = input("➡️ Digite aqui seus serviços: ")

    transporte = input("➡️ Como você vai pro serviço? (A pé, bicicleta, moto, carro ou ônibus): ")

    galeria = input("➡️ Quer colocar fotos dos seus trabalhos? (S/N): ")
    if galeria.lower() == "s":
        galeria_fotos = input("📸 Me manda os links ou nomes das fotos, separados por vírgula: ")
    else:
        galeria_fotos = "Sem fotos"

    print("\n✅ Fechou, tá tudo certo!")
    print("Agora é só apertar no botão azul *Finalizar Cadastro* no site. Você tá no ConectaPro e já pode ser chamado pra trampo na sua cidade!")

    cadastro = {
        "nome": nome,
        "whatsapp": whatsapp,
        "profissao": profissao,
        "bairro": bairro,
        "experiencia": experiencia,
        "idade": idade,
        "foto_perfil": foto_perfil_link,
        "servicos": servicos,
        "transporte": transporte,
        "galeria": galeria_fotos
    }

    print("\n📝 Dados do Cadastro:")
    for chave, valor in cadastro.items():
        print(f"{chave.capitalize()}: {valor}")

    return cadastro


if __name__ == "__main__":
    cadastrar_profissional() 