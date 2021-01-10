const { StatusCodes } = require("http-status-codes");
const ErrorMessage = require("./utils/errorMessages");
const { getDBTimes } = require("./utils/getDBTimes");
const { readTable } = require("../database/interface/read");
const { validatePassword, generatePassword } = require("./PasswordsController");
const { createRegister } = require("../database/interface/create");
const { createPeople } = require("./PeopleController");
const table = "contributors";
const amountInitial = 0;
const accountBalanceInitial = 0;

module.exports = {
  async read(req, res) {
    const dbResponse = await readTable(table);
    return res.status(StatusCodes.OK).json(dbResponse);
  },
  async createContributor(data) {
    return createRegister(table, data);
  },
  async create(req, res) {
    const {
      fullName,
      username,
      birthday,
      mothersFullName,
      email,
      phoneNumber,
      enrolledDepartments,
      password,
      hasAcceptedTermsOfUse,
    } = req.body;

    if (!hasAcceptedTermsOfUse) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: ErrorMessage.termsOfUse });
    }

    const isPasswordOK = validatePassword(password);
    if (isPasswordOK !== true) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: isPasswordOK });
    }

    const { created_at, updated_at } = getDBTimes();

    const dbResponsePassword = await generatePassword(
      password,
      created_at,
      updated_at
    );

    const dataForPeople = {
      fk_password: dbResponsePassword.id,
      full_name: fullName,
      username,
      birthday,
      mothers_full_name: mothersFullName,
      email,
      whatsapp: phoneNumber,
      created_at,
      updated_at,
    };
    const dbResponsePeople = await createPeople(dataForPeople);

    const dataForContributor = {
      fk_people: dbResponsePeople.id,
      amount: amountInitial,
      account_balance: accountBalanceInitial,
      created_at,
      updated_at,
    };

    const { id } = await createRegister(table, dataForContributor)

    return res.status(StatusCodes.OK).json({ id });
  },
};
