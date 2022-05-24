'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
/**
 * @Controller userRole
 */
class UserRoleController extends egg_1.Controller {
    /**
     * @Summary 设置用户角色
     * @Router post /user-role/setRole
     * @Request body userRoleBody *payload 用户角色入参
     * @Bearer
     * @Response 200 baseResponse
     * @Response 400 errorResponse
     */
    async setRole() {
        const { ctx } = this;
        const data = ctx.request.body;
        ctx.validate(ctx.rule.userRoleBody, data);
        const { userId, roleId } = data;
        const user = await ctx.service.user.find(parseInt(userId));
        const roles = await ctx.service.role.findByRoleId(roleId);
        if (roles.length) {
            const currentRoles = await user.getRoles();
            if (currentRoles && currentRoles.length) {
                await user.removeRoles(currentRoles);
            }
            await user.addRoles(roles);
        }
        else {
            await user.setRoles([]);
        }
        ctx.status = 200;
        ctx.body = {
            status: 'success'
        };
    }
}
exports.default = UserRoleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyUm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBQ2IsNkJBQWlDO0FBRWpDOztHQUVHO0FBRUgsTUFBcUIsa0JBQW1CLFNBQVEsZ0JBQVU7SUFDeEQ7Ozs7Ozs7T0FPRztJQUVILEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNwQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUM3QixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3pDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQzFELE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3pELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUMxQyxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN2QyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7YUFDckM7WUFDRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDM0I7YUFBTTtZQUNMLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUN4QjtRQUNELEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDVCxNQUFNLEVBQUUsU0FBUztTQUNsQixDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBL0JELHFDQStCQyJ9