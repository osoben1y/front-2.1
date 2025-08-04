import { Component } from "react";

export default class Todo extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            data: [],
            updatingItem: null,
            isModalOpen: false,
            searchTerm: "",
            modalState: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, data, updatingItem } = this.state;

        if (updatingItem) {
            const updatedData = data.map((item) =>
                item.id === updatingItem.id ? { ...item, title, description } : item
            );
            this.setState({
                data: updatedData,
                title: "",
                description: "",
                updatingItem: null,
                isModalOpen: false,
            });
        } else {
            const newTodo = {
                id: Date.now(),
                title,
                description,
            };
            this.setState({
                data: [...data, newTodo],
                title: "",
                description: "",
                isModalOpen: false,
            });
        }
    };

    handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            const updatedData = this.state.data.filter((item) => item.id !== id);
            this.setState({ data: updatedData });
        }
    };

    handleUpdate = (todo) => {
        this.setState({
            title: todo.title,
            description: todo.description,
            updatingItem: todo,
            isModalOpen: true,
        });
    };

    filteredData = () => {
        const { data, searchTerm } = this.state;
        return data.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    render() {
        const { title, description, isModalOpen, searchTerm } = this.state;
        return (
            <div className="max-w-5xl mx-auto mt-12 px-6">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Todo list</h1>
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="title boyicha qidirish"
                        value={searchTerm}
                        onChange={(e) => this.setState({ searchTerm: e.target.value })}
                        className="w-2/3 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={() => {
                            this.setState({
                                isModalOpen: true,
                                title: "",
                                description: "",
                                updatingItem: null,
                            }, () => {
                                setTimeout(() => this.setState({ modalAnimation: true }), 10);
                            });
                        }}

                        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 z"
                    >
                        +
                    </button>
                </div>

                {isModalOpen && (
                    <div
                        className={`fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transform transition-all duration-300 ${this.state.modalAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            }`}
                        onClick={() => {
                            this.setState({ modalAnimation: false });
                            setTimeout(() => {
                                this.setState({
                                    isModalOpen: false,
                                    title: "",
                                    description: "",
                                    updatingItem: null,
                                });
                            }, 300);
                        }}
                    >
                        <div
                            className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl"
                            onClick={(e) => e.stopPropagation()} // ❗ modal ichidagi klik tashqi klik emas
                        >
                            <h2 className="text-xl font-medium mb-4">
                                {this.state.updatingItem ? "update Task" : "new Task"}
                            </h2>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    required
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => this.setState({ title: e.target.value })}
                                    className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
                                />
                                <textarea
                                    required
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) =>
                                        this.setState({ description: e.target.value })
                                    }
                                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
                                />
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="submit"
                                        className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                                    >
                                        save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState({ modalAnimation: false });
                                            setTimeout(() => {
                                                this.setState({
                                                    isModalOpen: false,
                                                    title: "",
                                                    description: "",
                                                    updatingItem: null,
                                                });
                                            }, 300);
                                        }}
                                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                                    >
                                        cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


                <div className="overflow-x-auto mt-6 shadow-sm border border-gray-200 rounded-lg">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3 text-center" colSpan={2}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {this.filteredData().map((todo, index) => (
                                <tr key={todo.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{todo.title}</td>
                                    <td className="px-4 py-2">{todo.description}</td>
                                    <td className="px-2 py-2 text-center">
                                        <button
                                            onClick={() => this.handleUpdate(todo)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            update
                                        </button>
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                        <button
                                            onClick={() => this.handleDelete(todo.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {this.filteredData().length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-400">
                                        todo topilmadi
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

