# Coding Standard
## Variable Naming Convention

| Object Name        | Notation     | Length | Char Mask  | Underscores |
| ------------------ | ------------ | ------ | ---------- | ----------- |
| Function name      | camelCase    | 50     | [A-z][0-9] | No          |
| Function arguments | camelCase    | 50     | [A-z][0-9] | No          |
| Local variables    | camelCase    | 50     | [A-z][0-9] | No          |
| Constants name     | CAPITAL_CASE | 50     | [A-z][0-9] | Yes         |
| Field name         | camelCase    | 50     | [A-z][0-9] | No          |

## Import Orders:

As we know we are going to import multiple things in every file(pages,components,etc), Please follow below import order.

1. library imports.
2. local imports (import pages, components, routes).
3. utils imports. (utils -> constants, helper functions, types).
4. style imports (import from component.styled.tsx file or import from scss files).


# Following instructions are for components-lib folder

## Creating New Components:

1. Create folder where folder name is in **PascalCase**
2. Create **4** files inside that folder which should be named and contain following:

    i. [ComponentName].component.tsx : This contains component related code. Use functional component. Do default export for that component.

    ii. [ComponentName].styled.tsx : This will contain all the styled related logic, used with styled-components.

    iii. [ComponentName].stories.tsx : This will contain storybook related template to render that particular component.

    iv. index.ts : This file will import the component from [ComponentName].component.tsx and do the default export for that component.

**Note:** Please make sure that all the reusable components have stories integrated.

# Following instruction are for catalogue and wizard apps

## Environment Variables

For adding any new environment variable following will be the process

1. Add that variable and value in .env.local / .env.development / .env.production file
2. Add that variable in vite-env.d.ts.

| Variable Name                     | Description                      | 
| --------------------------------- | -------------------------------- |
| VITE_WIZARD_API_BASE_URL          | Wizard Backend Api BASE URL      |  
| VITE_WIZARD_KEYCLOAK_AUTH_URI     | KeyCloak URL                     |
| VITE_WIZARD_KEYCLOAK_AUTH_CLIENT  | KeyCloak Client                  | 
| VITE_WIZARD_KEYCLOAK_AUTH_REALM   | KeyCloak REALM                   | 
| VITE_CATALOGUE_API_BASE_URL       | Catalogue Backend Api BASE URL   | 
| VITE_WIZARD_HOST                  | Wizard Host                      | 
| VITE_CATALOGUE_HOST               | Catalogue Host                   | 


## Folder Structure

Consider below folders inside src of wizard or catalogue apps

1. api: This folder will contain all the APIs we want in the application.

2. assets: This folder will contain all the images used by application.

3. components: This folder will contain all the components used by application.

4. contexts: This folder will contain all the context used by application. For adding any new context, follow the process of 'Adding new context'.

5. hooks: This folder will contain all the hooks used by application. For adding new hook, follow the process of 'Adding new hook'.

6. models: This folder will contain all the common interfaces/types used by application.

7. routes: This folder will contain all the routing related configuration.

8. pages: This folder will contain all the pages used by application. For adding new page, follow the process of 'Adding new page'.

9. styles: This folder will contain all the new variables, mixins, and other style related things which we need for scss.

10. utils: This folder will contain all the common logic, constants and helpers.

    i. constants: This folder will have common constants used by application.

    ii. helpers: This folder will contain all the common functions used by application.

    iii. apiManager.ts: This file will contain all common logic for API calling.

    iv. keycloak.ts: This file will contain the keycloak configuration and common logic.

## Adding new page

1. Create new folder 'your_page_name' inside 'pages' folder.
2. Create two files named as:
    1. 'your_page_name'.component.tsx and write any example template. (**Hint**: You can use rfce if you have react snippet extension installed).
    2. 'your_page_name'.module.scss file for writing up styles and import like we have in Authentication.page.tsx on line 6.
3. To configure routing for this page, follow steps mentioned in 'Adding new route' section.

## Adding new route

1. Go to src/routes/routes.ts, add a route in ROUTES_CONST using PUBLIC or PRIVATE based on requirement.
2. Go to src/routes/routes.config.ts and define route mapping/configuration here.

    **Note:** use lazy import for page.

## Adding new component

Process for adding new component:

1. Create folder where folder name is in **PascalCase**
2. Create below files inside that folder which should be named and contains as per the following:

    i. [ComponentName].component.tsx : This contains component related code. Use functional component.

    ii. [ComponentName].module.scss : This will contain all the style related the components.

    iii. [ComponentName].validations.ts : This will contain all the validation for this component (optional file)

    iv. [ComponentName].helpers.ts: This will contain all the helper functions for this component (optional file)

    v. [ComponentName].constant.ts: This will contain all the constants specific for this component (optional file)

    vi. index.ts : This file will import the component from [ComponentName].component.tsx and do the export for that component.

## Adding new context

Process for adding any new context:

1. Create folder where folder name is in **PascalCase**
2. Create two files inside that folder:

    i. [ContextName].context.tsx, where context name should be in **PascalCase**, which contains all the context related logic.

    ii. Add index.ts file which imports and exports(named) context.

## Adding new hook

Process to follow for adding any new custom hook:

1. Create separate file named as use[YourHookName] inside src/hooks folder.

2. Export that hook from the file.

3. Import same hooks in index.ts located in src/hooks folder.

4. Do named export from index.ts file.

## Theme

We have done the setup of styled component's theme so for every new color, font family, font size, we need to follow below steps:

1. Add those in src/theme/theme.config.tsx.
2. Consume those values in styled component using theme prop.

## Static Analysis Tooling

For static analysis we have configured below tools,

1. ESLint - Recommended plugins and rules
2. Prettier - Code formatting basic rules
3. Husky and Lint Staged - Checking linting before any commit

## Main Packages

Final form for the form and validations

```
https://final-form.org/docs/react-final-form/getting-started
```

MUI framework for the UI components

```
https://mui.com/material-ui/react-tabs/
```

Tailwindcss for CSS framework

```
https://tailwindcss.com/docs/guides/create-react-app
```
