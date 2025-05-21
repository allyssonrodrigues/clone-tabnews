function status(request, response) {
  response.status(200).json({ aluno: "Alunos do curso dev" });
}

export default status;
