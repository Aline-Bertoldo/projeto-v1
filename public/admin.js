$(document).ready(function() {
    // Carregar leads ao carregar a página
    function loadLeads() {
        $.ajax({
            url: "http://localhost:3000/leads",
            method: "GET",
            success: function(data) {
                $('#leadsTable tbody').empty();
                data.forEach(lead => {
                    $('#leadsTable tbody').append(`
                        <tr>
                            <td>${lead.name}</td>
                            <td>${lead.email}</td>
                            <td>
                                <button onclick="updateLead(${lead.id})">Alterar</button>
                                <button onclick="deleteLead(${lead.id})">Remover</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function(err) {
                alert("Erro ao carregar leads!");
                console.error("Erro ao carregar leads: ", err);
            }
        });
    }

    // Função para abrir modal e preencher com os dados do lead para edição
    window.updateLead = function(id) {
        let row = $(`button[onclick="updateLead(${id})"]`).closest('tr');
        let name = row.find('td:nth-child(1)').text();
        let email = row.find('td:nth-child(2)').text();

        $("#editName").val(name);
        $("#editEmail").val(email);
        $("#editId").val(id);
        $("#editModal").modal('show'); // Mostra o modal
    }

    // Função para enviar a requisição de edição ao servidor
    $("#editForm").on("submit", function(event) {
        event.preventDefault();

        const id = $("#editId").val();
        const name = $("#editName").val();
        const email = $("#editEmail").val();

        $.ajax({
            url: `http://localhost:3000/leads/${id}`,
            method: "PUT",
            data: { name: name, email: email },
            success: function() {
                loadLeads();
                $("#editModal").modal('hide');
                alert("Lead atualizado com sucesso!");
            },
            error: function(err) {
                alert("Erro ao atualizar lead!");
                console.error("Erro ao atualizar lead: ", err);
            }
        });
    });

    // Função para enviar a requisição de remoção ao servidor
    window.deleteLead = function(id) {
        if (confirm("Tem certeza de que deseja remover este lead?")) {
            $.ajax({
                url: `http://localhost:3000/leads/${id}`,
                method: "DELETE",
                success: function() {
                    loadLeads();
                    alert("Lead removido com sucesso!");
                },
                error: function(err) {
                    alert("Erro ao remover lead!");
                    console.error("Erro ao remover lead: ", err);
                }
            });
        }
    }

    // Carregando os leads inicialmente
    loadLeads();
});
