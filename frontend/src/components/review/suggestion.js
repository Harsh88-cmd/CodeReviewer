
export const getSuggestions = (monaco) => {
  const snippet = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
  const kind    = monaco.languages.CompletionItemKind;

  // python
  monaco.languages.registerCompletionItemProvider('python', {
    provideCompletionItems: () => ({
      suggestions: [
        { label: 'def',     insertText: 'def ${1:name}(${2:args}):\n\t${3:pass}',                          detail: 'Function definition' },
        { label: 'class',   insertText: 'class ${1:Name}:\n\tdef __init__(self):\n\t\t${2:pass}',          detail: 'Class definition'    },
        { label: 'if',      insertText: 'if ${1:condition}:\n\t${2:pass}',                                 detail: 'If statement'        },
        { label: 'for',     insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:pass}',                    detail: 'For loop'            },
        { label: 'while',   insertText: 'while ${1:condition}:\n\t${2:pass}',                              detail: 'While loop'          },
        { label: 'try',     insertText: 'try:\n\t${1:pass}\nexcept ${2:Exception} as e:\n\t${3:pass}',     detail: 'Try/except'          },
        { label: 'import',  insertText: 'import ${1:module}',                                              detail: 'Import module'       },
        { label: 'from',    insertText: 'from ${1:module} import ${2:name}',                               detail: 'From import'         },
        { label: 'print',   insertText: 'print(${1})',                                                     detail: 'Print function'      },
        { label: 'len',     insertText: 'len(${1})',                                                       detail: 'Get length'          },
        { label: 'range',   insertText: 'range(${1:start}, ${2:stop})',                                    detail: 'Range function'      },
        { label: 'lambda',  insertText: 'lambda ${1:args}: ${2:expr}',                                     detail: 'Lambda function'     },
        { label: 'with',    insertText: 'with ${1:expr} as ${2:var}:\n\t${3:pass}',                        detail: 'With statement'      },
        { label: 'list',    insertText: 'list(${1})',                                                      detail: 'List constructor'    },
        { label: 'dict',    insertText: 'dict(${1})',                                                      detail: 'Dict constructor'    },
      ].map(s => ({
        ...s,
        kind: kind.Snippet,
        insertTextRules: snippet,
      })),
    }),
  });

  // Java
  monaco.languages.registerCompletionItemProvider('java', {
    provideCompletionItems: () => ({
      suggestions: [
        { label: 'sout',       insertText: 'System.out.println(${1});',                                                          detail: 'Print to console'    },
        { label: 'main',       insertText: 'public static void main(String[] args) {\n\t${1}\n}',                                detail: 'Main method'         },
        { label: 'class',      insertText: 'public class ${1:Name} {\n\t${2}\n}',                                                detail: 'Class definition'    },
        { label: 'if',         insertText: 'if (${1:condition}) {\n\t${2}\n}',                                                   detail: 'If statement'        },
        { label: 'for',        insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${3}\n}',                      detail: 'For loop'            },
        { label: 'foreach',    insertText: 'for (${1:Type} ${2:item} : ${3:collection}) {\n\t${4}\n}',                           detail: 'For each loop'       },
        { label: 'while',      insertText: 'while (${1:condition}) {\n\t${2}\n}',                                                detail: 'While loop'          },
        { label: 'try',        insertText: 'try {\n\t${1}\n} catch (${2:Exception} e) {\n\t${3}\n}',                            detail: 'Try/catch'           },
        { label: 'interface',  insertText: 'public interface ${1:Name} {\n\t${2}\n}',                                            detail: 'Interface'           },
        { label: 'private',    insertText: 'private ${1:type} ${2:name};',                                                       detail: 'Private field'       },
        { label: 'public',     insertText: 'public ${1:type} ${2:name}(${3}) {\n\t${4}\n}',                                      detail: 'Public method'       },
        { label: 'ArrayList',  insertText: 'ArrayList<${1:Type}> ${2:list} = new ArrayList<>();',                                detail: 'ArrayList'           },
        { label: 'HashMap',    insertText: 'HashMap<${1:Key}, ${2:Value}> ${3:map} = new HashMap<>();',                          detail: 'HashMap'             },
        { label: 'extends',    insertText: 'extends ${1:ClassName}',                                                             detail: 'Extends class'       },
        { label: 'implements', insertText: 'implements ${1:Interface}',                                                          detail: 'Implements'          },
      ].map(s => ({
        ...s,
        kind: kind.Snippet,
        insertTextRules: snippet,
      })),
    }),
  });

  // Go
  monaco.languages.registerCompletionItemProvider('go', {
    provideCompletionItems: () => ({
      suggestions: [
        { label: 'func',      insertText: 'func ${1:name}(${2:args}) ${3:returnType} {\n\t${4}\n}', detail: 'Function'          },
        { label: 'fmt',       insertText: 'fmt.Println(${1})',                                       detail: 'Print line'        },
        { label: 'if',        insertText: 'if ${1:condition} {\n\t${2}\n}',                          detail: 'If statement'      },
        { label: 'iferr',     insertText: 'if err != nil {\n\treturn ${1:err}\n}',                   detail: 'Error check'       },
        { label: 'for',       insertText: 'for ${1:i} := 0; ${1:i} < ${2:n}; ${1:i}++ {\n\t${3}\n}', detail: 'For loop'        },
        { label: 'struct',    insertText: 'type ${1:Name} struct {\n\t${2:Field} ${3:Type}\n}',      detail: 'Struct'            },
        { label: 'goroutine', insertText: 'go func() {\n\t${1}\n}()',                                detail: 'Goroutine'         },
        { label: 'chan',      insertText: 'make(chan ${1:Type})',                                     detail: 'Channel'           },
        { label: 'defer',     insertText: 'defer ${1:func}()',                                       detail: 'Defer'             },
        { label: 'switch',    insertText: 'switch ${1:expr} {\ncase ${2}:\n\t${3}\ndefault:\n\t${4}\n}', detail: 'Switch'       },
        { label: 'map',       insertText: 'make(map[${1:Key}]${2:Value})',                           detail: 'Map'               },
        { label: 'package',   insertText: 'package ${1:main}',                                      detail: 'Package'           },
        { label: 'import',    insertText: 'import (\n\t"${1:fmt}"\n)',                               detail: 'Import'            },
      ].map(s => ({
        ...s,
        kind: kind.Snippet,
        insertTextRules: snippet,
      })),
    }),
  });

  // Rust
  monaco.languages.registerCompletionItemProvider('rust', {
    provideCompletionItems: () => ({
      suggestions: [
        { label: 'fn',      insertText: 'fn ${1:name}(${2:args}) -> ${3:ReturnType} {\n\t${4}\n}',  detail: 'Function'          },
        { label: 'println', insertText: 'println!("${1}", ${2});',                                   detail: 'Print macro'       },
        { label: 'let',     insertText: 'let ${1:name} = ${2:value};',                               detail: 'Let binding'       },
        { label: 'letmut',  insertText: 'let mut ${1:name} = ${2:value};',                           detail: 'Mutable binding'   },
        { label: 'if',      insertText: 'if ${1:condition} {\n\t${2}\n}',                            detail: 'If statement'      },
        { label: 'match',   insertText: 'match ${1:expr} {\n\t${2} => ${3},\n\t_ => ${4},\n}',      detail: 'Match expression'  },
        { label: 'struct',  insertText: 'struct ${1:Name} {\n\t${2:field}: ${3:Type},\n}',           detail: 'Struct'            },
        { label: 'impl',    insertText: 'impl ${1:Name} {\n\t${2}\n}',                               detail: 'Implementation'    },
        { label: 'for',     insertText: 'for ${1:item} in ${2:iter} {\n\t${3}\n}',                   detail: 'For loop'          },
        { label: 'vec',     insertText: 'vec![${1}]',                                                detail: 'Vector macro'      },
        { label: 'use',     insertText: 'use ${1:std::collections::HashMap};',                       detail: 'Use statement'     },
        { label: 'enum',    insertText: 'enum ${1:Name} {\n\t${2:Variant},\n}',                      detail: 'Enum'              },
      ].map(s => ({
        ...s,
        kind: kind.Snippet,
        insertTextRules: snippet,
      })),
    }),
  });

  // C++
  monaco.languages.registerCompletionItemProvider('cpp', {
    provideCompletionItems: () => ({
      suggestions: [
        { label: 'cout',      insertText: 'std::cout << ${1} << std::endl;',                                  detail: 'Print to console' },
        { label: 'cin',       insertText: 'std::cin >> ${1};',                                                detail: 'Read input'       },
        { label: 'main',      insertText: 'int main() {\n\t${1}\n\treturn 0;\n}',                             detail: 'Main function'    },
        { label: 'include',   insertText: '#include <${1:iostream}>',                                         detail: 'Include header'   },
        { label: 'class',     insertText: 'class ${1:Name} {\npublic:\n\t${2}\n};',                           detail: 'Class'            },
        { label: 'if',        insertText: 'if (${1:condition}) {\n\t${2}\n}',                                 detail: 'If statement'     },
        { label: 'for',       insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${3}\n}',   detail: 'For loop'         },
        { label: 'while',     insertText: 'while (${1:condition}) {\n\t${2}\n}',                              detail: 'While loop'       },
        { label: 'vector',    insertText: 'std::vector<${1:Type}> ${2:name};',                                detail: 'Vector'           },
        { label: 'map',       insertText: 'std::map<${1:Key}, ${2:Value}> ${3:name};',                        detail: 'Map'              },
        { label: 'struct',    insertText: 'struct ${1:Name} {\n\t${2:Type} ${3:field};\n};',                  detail: 'Struct'           },
        { label: 'try',       insertText: 'try {\n\t${1}\n} catch (${2:std::exception}& e) {\n\t${3}\n}',    detail: 'Try/catch'        },
        { label: 'namespace', insertText: 'namespace ${1:name} {\n\t${2}\n}',                                 detail: 'Namespace'        },
      ].map(s => ({
        ...s,
        kind: kind.Snippet,
        insertTextRules: snippet,
      })),
    }),
  });
};